import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Appbar, Card, Title, Paragraph } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao Driver Finance!</Text>
        <Text style={styles.subtitle}>
          Um aplicativo para ajudar motoristas a gerenciar seus custos e ganhos.
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Calculadora de KM</Title>
            <Paragraph>
              Calcule quanto você deve cobrar por quilômetro rodado para cobrir
              todos os custos do seu veículo e alcançar seu objetivo de ganhos mensais.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CalculadoraKM')}
              style={styles.button}
            >
              Abrir Calculadora de KM
            </Button>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Renda Líquida</Title>
            <Paragraph>
              Calcule seus ganhos líquidos considerando todos os custos operacionais e despesas adicionais.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('NetEarningsCalculator')}
              style={styles.button}
            >
              Abrir Calculadora de Ganhos Líquidos
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#000000',
  },
});

export default HomeScreen;
