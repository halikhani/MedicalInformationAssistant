import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { transcribeWithWhisper } from '../utils/transcribeAudio';
import { queryGPT } from '../utils/queryGPT';

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(null);
  const [recordedUri, setRecordedUri] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [matchedInfo, setMatchedInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const sampleInput = "What kind of rehab exercises should I do after ACL surgery?";
  
  const testWithSampleInput = async () => {
    try {
      setTranscript(sampleInput);
      setLoading(true);
      const gptResponse = await queryGPT(sampleInput);
      setMatchedInfo(gptResponse);
    } catch (err) {
      console.error('Test GPT Error:', err);
      alert('Test failed.');
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        alert('Permission to access microphone is required!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setTranscript('');
      setMatchedInfo(null);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = async () => {
    try {
      setLoading(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedUri(uri);
      setRecording(null);

      // Step 1: Transcribe audio with Whisper
      const transcript = await transcribeWithWhisper(uri);
      setTranscript(transcript);

      // Step 2: Send transcript to GPT for intelligent medical response
      const gptResponse = await queryGPT(transcript);
      setMatchedInfo(gptResponse);
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong during transcription or GPT query.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <View style={{ marginTop: 16 }}>
  <Button
    title="Run Test with Sample Input"
    onPress={testWithSampleInput}
    color="#888"
  />
</View>


      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {recordedUri && !loading && (
        <Text style={styles.uriText}>🎤 Audio saved at: {recordedUri}</Text>
      )}

      {transcript && (
        <View style={styles.transcriptionBox}>
          <Text style={styles.label}>🗣️ Transcribed Text:</Text>
          <Text style={styles.transcript}>{transcript}</Text>
        </View>
      )}

      {matchedInfo && (
        <View style={styles.responseBox}>
          <Text style={styles.label}>📋 Surgery: {matchedInfo.procedure}</Text>
          <Text style={{ fontStyle: 'italic', marginBottom: 6 }}>Topic: {matchedInfo.intent}</Text>
          <Text>{matchedInfo.response}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginTop: 40,
  },
  uriText: {
    marginTop: 16,
    fontSize: 12,
    color: 'gray',
  },
  transcriptionBox: {
    marginTop: 24,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  transcript: {
    fontSize: 16,
  },
  responseBox: {
    marginTop: 20,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 16,
  },
});
