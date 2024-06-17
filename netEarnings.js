import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Appbar, useTheme } from 'react-native-paper';
import { z } from 'zod';

const netEarningsSchema = z.object({
  grossIncome: z.number(),
  fuelCosts: z.number(),
  maintenanceCosts: z.number().optional(),
  otherExpenses: z.number().optional(),
  workHours: z.number().optional(),
  foodCosts: z.number().optional(),
  kmsDriven: z.number(),
});

const NetEarningsCalculator = () => {
  const [inputs, setInputs] = useState({
    grossIncome: '',
    fuelCosts: '',
    maintenanceCosts: '',
    otherExpenses: '',
    workHours: '',
    foodCosts: '',
    kmsDriven: '',
  });

  const [netEarnings, setNetEarnings] = useState(null);
  const [hourlyIncome, setHourlyIncome] = useState(null);
  const [pricePerKm, setPricePerKm] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (value, field) => {
    setInputs({
      ...inputs,
      [field]: value,
    });
    setErrors({
      ...errors,
      [field]: '',
    });
  };

  const parseNumber = (value) => {
    const parsed = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    return isNaN(parsed) ? undefined : parsed;
  };

  const validateInputs = () => {
    const parsedInputs = {
      grossIncome: parseNumber(inputs.grossIncome),
      fuelCosts: parseNumber(inputs.fuelCosts),
      maintenanceCosts: parseNumber(inputs.maintenanceCosts),
      otherExpenses: parseNumber(inputs.otherExpenses),
      workHours: parseNumber(inputs.workHours),
      foodCosts: parseNumber(inputs.foodCosts),
      kmsDriven: parseNumber(inputs.kmsDriven),
    };

    try {
      netEarningsSchema.parse(parsedInputs);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const calculateNetEarnings = () => {
    if (!validateInputs()) {
      return;
    }

    const { grossIncome, fuelCosts, maintenanceCosts, otherExpenses, workHours, foodCosts, kmsDriven } = inputs;

    const netEarnings =
      parseNumber(grossIncome) -
      parseNumber(fuelCosts) -
      parseNumber(maintenanceCosts) -
      (parseNumber(otherExpenses) || 0) -
      (parseNumber(foodCosts) || 0);

    setNetEarnings(netEarnings.toFixed(2));

    if (workHours) {
      const hourlyIncome = netEarnings / parseNumber(workHours);
      setHourlyIncome(hourlyIncome.toFixed(2));
    } else {
      setHourlyIncome(null);
    }

    const pricePerKm = netEarnings / parseNumber(kmsDriven);
    setPricePerKm(pricePerKm.toFixed(2));
  };

  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Calculadora de Ganhos Líquidos" />
      </Appbar.Header>
      <View style={styles.form}>
        <TextInput
          label="Receita Bruta (R$) *"
          value={inputs.grossIncome}
          onChangeText={(value) => handleChange(value, 'grossIncome')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.grossIncome}
        />
        {errors.grossIncome && <Text style={styles.errorText}>{errors.grossIncome}</Text>}
        <TextInput
          label="Gastos com Combustível (R$) *"
          value={inputs.fuelCosts}
          onChangeText={(value) => handleChange(value, 'fuelCosts')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.fuelCosts}
        />
        {errors.fuelCosts && <Text style={styles.errorText}>{errors.fuelCosts}</Text>}
        <TextInput
          label="Gastos com Manutenção do Veículo (R$)"
          value={inputs.maintenanceCosts}
          onChangeText={(value) => handleChange(value, 'maintenanceCosts')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.maintenanceCosts}
        />
        {errors.maintenanceCosts && <Text style={styles.errorText}>{errors.maintenanceCosts}</Text>}
        <TextInput
          label="Outro Tipo de Despesas (R$)"
          value={inputs.otherExpenses}
          onChangeText={(value) => handleChange(value, 'otherExpenses')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.otherExpenses}
        />
        {errors.otherExpenses && <Text style={styles.errorText}>{errors.otherExpenses}</Text>}
        <TextInput
          label="Alimentação (R$)"
          value={inputs.foodCosts}
          onChangeText={(value) => handleChange(value, 'foodCosts')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.foodCosts}
        />
        {errors.foodCosts && <Text style={styles.errorText}>{errors.foodCosts}</Text>}
        <TextInput
          label="Horas Trabalhadas"
          value={inputs.workHours}
          onChangeText={(value) => handleChange(value, 'workHours')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.workHours}
        />
        {errors.workHours && <Text style={styles.errorText}>{errors.workHours}</Text>}
        <TextInput
          label="KMs Rodados (KM) *"
          value={inputs.kmsDriven}
          onChangeText={(value) => handleChange(value, 'kmsDriven')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.kmsDriven}
        />
        {errors.kmsDriven && <Text style={styles.errorText}>{errors.kmsDriven}</Text>}
        <Button
          mode="contained"
          onPress={calculateNetEarnings}
          style={styles.button}
        >
          Calcular
        </Button>
        {netEarnings !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Ganhos Líquidos: R${netEarnings}</Text>
          </View>
        )}
        {hourlyIncome !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Renda Horária: R${hourlyIncome}</Text>
          </View>
        )}
        {pricePerKm !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Preço por KM: R${pricePerKm}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000000',
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default NetEarningsCalculator;
