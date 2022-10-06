import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LogBox } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Player from './Player'

export default function App() {
  
  LogBox.ignoreAllLogs(true);

  const [audioIndex, setarAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [audio, setarAudio] = useState(null);

  const [musicas, setarMusicas] = useState([
    {
      nome: 'Smooth Criminal',
      artista: 'Michael Jackson',
      playing: false,
      file: require('./audio1.mp3')
    },
    {
      nome: 'Praise God',
      artista: 'Kanye West',
      playing: false,
      file: require('./audio2.mp3')
    },
    {
      nome: 'Dynamite',
      artista: 'Tiao Cruz',
      playing: false,
      file: require('./audio1.mp3')
    },
  ]);

  const changeMusic = async (id) => {
    let curFile = null;
    let newMusics = musicas.filter((val, k) => {
      if (id == k) {
        musicas[k].playing = true;
        curFile = musicas[k].file;
        setPlaying(true);
        setarAudioIndex(id);
      } else {
        musicas[k].playing = false;
      }

      return musicas[k];
    })

    if (audio != null) {
      audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch (error) { }

    setarAudio(curAudio);
    setarMusicas(newMusics);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <StatusBar hidden />

        <View style={styles.header}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 25, }}>
            App de Músicas
          </Text>
        </View>

        <View style={styles.table}>
          <Text style={{ width: '50%', color: 'white' }}>Música</Text>
          <Text style={{ width: '50%', color: 'white' }}>Artista</Text>
        </View>

        {
          musicas.map((val, k) => {

            if (val.playing) {
              //se ta tocando renderiza aqui
              return (
                <View style={styles.table}>
                  <TouchableOpacity onPress={() => changeMusic(k)} style={{ width: '100%', flexDirection: 'row' }}>
                    <Text style={{ width: '50%', color: '#1DB954' }}><AntDesign name='play' size={15} color='#1DB954' /> {val.nome}</Text>
                    <Text style={{ width: '50%', color: '#1DB954' }}>{val.artista}</Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              //se não renderiza aqui
              return (
                <View style={styles.table}>
                  <TouchableOpacity onPress={() => changeMusic(k)} style={{ width: '100%', flexDirection: 'row' }}>
                    <Text style={{ width: '50%', color: 'rgb(200,200,200)' }}><AntDesign name='play' size={15} color='white' /> {val.nome}</Text>
                    <Text style={{ width: '50%', color: 'rgb(200,200,200)' }}>{val.artista}</Text>
                  </TouchableOpacity>
                </View>
              );
            }

          })
        }

        <View style={{ paddingBottom: 200 }}></View>
      </ScrollView>

      <Player setarAudioIndex={setarAudioIndex} playing={playing} setPlaying={setPlaying} audioIndex={audioIndex}
      musicas={musicas} setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}>

      </Player>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    backgroundColor: '#1DB954',
    width: '100%',
    padding: 20,
  },
  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  }
});
