import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Appbar, useTheme } from 'react-native-paper';

const CalculadoraKM = () => {
  const [inputs, setInputs] = useState({
    monthlyEarnings: '',
    carValue: '',
    depreciation: '',
    installment: '',
    monthlyKM: '',
    ipva: '',
    insurance: '',
    tireCost: '',
    tireLife: '',
    oilChangeCost: '',
    oilLife: '',
    annualMaintenance: '',
    fuelPrice: '',
    fuelConsumption: '',
  });

  const [costPerKM, setCostPerKM] = useState(null);
  const [minPricePerKM, setMinPricePerKM] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (value, field) => {
    const formattedValue = formatNumber(value.replace(/[^0-9]/g, ''));
    setInputs({
      ...inputs,
      [field]: formattedValue,
    });
    setErrors({
      ...errors,
      [field]: '',
    });
  };

  const handleDepreciationChange = (value) => {
    const formattedValue = value.replace(/[^0-9]/g, '').slice(0, 3);
    setInputs({
      ...inputs,
      depreciation: formattedValue,
    });
    setErrors({
      ...errors,
      depreciation: '',
    });
  };

  const handleFuelPriceChange = (value) => {
    const formattedValue = value.replace(/[^0-9.]/g, '');
    setInputs({
      ...inputs,
      fuelPrice: formattedValue,
    });
    setErrors({
      ...errors,
      fuelPrice: '',
    });
  };

  const formatNumber = (value) => {
    if (!value) return value;
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const validateInputs = () => {
    let valid = true;
    let errors = {};

    if (!inputs.monthlyEarnings) {
      errors.monthlyEarnings = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.carValue) {
      errors.carValue = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.monthlyKM) {
      errors.monthlyKM = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.ipva) {
      errors.ipva = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.tireCost) {
      errors.tireCost = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.tireLife) {
      errors.tireLife = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.oilChangeCost) {
      errors.oilChangeCost = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.oilLife) {
      errors.oilLife = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.annualMaintenance) {
      errors.annualMaintenance = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.fuelPrice) {
      errors.fuelPrice = 'Este campo é obrigatório';
      valid = false;
    }
    if (!inputs.fuelConsumption) {
      errors.fuelConsumption = 'Este campo é obrigatório';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const calculateCostPerKM = () => {
    if (!validateInputs()) {
      return;
    }

    const {
      monthlyEarnings,
      carValue,
      depreciation,
      installment,
      monthlyKM,
      ipva,
      insurance,
      tireCost,
      tireLife,
      oilChangeCost,
      oilLife,
      annualMaintenance,
      fuelPrice,
      fuelConsumption,
    } = inputs;

    const monthlyDepreciation = (parseFloat(carValue.replace(/\./g, '')) * (parseFloat(depreciation) / 100)) / 12;
    const monthlyIPVA = parseFloat(ipva.replace(/\./g, '')) / 12;
    const monthlyInsurance = parseFloat(insurance.replace(/\./g, '')) / 12;
    const monthlyTireCost = (parseFloat(tireCost.replace(/\./g, '')) / parseFloat(tireLife.replace(/\./g, ''))) * parseFloat(monthlyKM.replace(/\./g, ''));
    const monthlyOilCost = (parseFloat(oilChangeCost.replace(/\./g, '')) / parseFloat(oilLife.replace(/\./g, ''))) * parseFloat(monthlyKM.replace(/\./g, ''));
    const monthlyFuelCost = (parseFloat(monthlyKM.replace(/\./g, '')) / parseFloat(fuelConsumption.replace(/\./g, ''))) * parseFloat(fuelPrice);

    const totalMonthlyCost =
      parseFloat(monthlyEarnings.replace(/\./g, '')) +
      monthlyDepreciation +
      parseFloat(installment.replace(/\./g, '') || 0) +
      monthlyIPVA +
      monthlyInsurance +
      monthlyTireCost +
      monthlyOilCost +
      parseFloat(annualMaintenance.replace(/\./g, '')) / 12 +
      monthlyFuelCost;

    const costPerKM = totalMonthlyCost / parseFloat(monthlyKM.replace(/\./g, ''));
    setCostPerKM(costPerKM.toFixed(2));

    const totalMonthlyCarCost =
      monthlyDepreciation +
      parseFloat(installment.replace(/\./g, '') || 0) +
      monthlyIPVA +
      monthlyInsurance +
      monthlyTireCost +
      monthlyOilCost +
      parseFloat(annualMaintenance.replace(/\./g, '')) / 12 +
      monthlyFuelCost;

    const minPricePerKM = totalMonthlyCarCost / parseFloat(monthlyKM.replace(/\./g, ''));
    setMinPricePerKM(minPricePerKM.toFixed(2));
  };

  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Calculadora de KM" />
      </Appbar.Header>
      <View style={styles.form}>
        <TextInput
          label="Quanto deseja ganhar por mês (R$) *"
          value={inputs.monthlyEarnings}
          onChangeText={(value) => handleChange(value, 'monthlyEarnings')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.monthlyEarnings}
        />
        {errors.monthlyEarnings && <Text style={styles.errorText}>{errors.monthlyEarnings}</Text>}
        <TextInput
          label="Valor do seu automóvel (R$) *"
          value={inputs.carValue}
          onChangeText={(value) => handleChange(value, 'carValue')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.carValue}
        />
        {errors.carValue && <Text style={styles.errorText}>{errors.carValue}</Text>}
        <TextInput
          label="Depreciação por ano (%)"
          value={inputs.depreciation}
          onChangeText={handleDepreciationChange}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.depreciation}
        />
        {errors.depreciation && <Text style={styles.errorText}>{errors.depreciation}</Text>}
        <TextInput
          label="Valor da parcela (R$)"
          value={inputs.installment}
          onChangeText={(value) => handleChange(value, 'installment')}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Quantos KM roda por mês *"
          value={inputs.monthlyKM}
          onChangeText={(value) => handleChange(value, 'monthlyKM')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.monthlyKM}
        />
        {errors.monthlyKM && <Text style={styles.errorText}>{errors.monthlyKM}</Text>}
        <TextInput
          label="IPVA Anual (R$) *"
          value={inputs.ipva}
          onChangeText={(value) => handleChange(value, 'ipva')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.ipva}
        />
        {errors.ipva && <Text style={styles.errorText}>{errors.ipva}</Text>}
        <TextInput
          label="Seguro Anual (R$)"
          value={inputs.insurance}
          onChangeText={(value) => handleChange(value, 'insurance')}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Custo dos pneus (R$) *"
          value={inputs.tireCost}
          onChangeText={(value) => handleChange(value, 'tireCost')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.tireCost}
        />
        {errors.tireCost && <Text style={styles.errorText}>{errors.tireCost}</Text>}
        <TextInput
          label="Vida útil dos pneus (KM) *"
          value={inputs.tireLife}
          onChangeText={(value) => handleChange(value, 'tireLife')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.tireLife}
        />
        {errors.tireLife && <Text style={styles.errorText}>{errors.tireLife}</Text>}
        <TextInput
          label="Custo da troca de óleo (R$) *"
          value={inputs.oilChangeCost}
          onChangeText={(value) => handleChange(value, 'oilChangeCost')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.oilChangeCost}
        />
        {errors.oilChangeCost && <Text style={styles.errorText}>{errors.oilChangeCost}</Text>}
        <TextInput
          label="Vida útil do óleo (KM) *"
          value={inputs.oilLife}
          onChangeText={(value) => handleChange(value, 'oilLife')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.oilLife}
        />
        {errors.oilLife && <Text style={styles.errorText}>{errors.oilLife}</Text>}
        <TextInput
          label="Custos com manutenção anual (R$) *"
          value={inputs.annualMaintenance}
          onChangeText={(value) => handleChange(value, 'annualMaintenance')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.annualMaintenance}
        />
        {errors.annualMaintenance && <Text style={styles.errorText}>{errors.annualMaintenance}</Text>}
        <TextInput
          label="Preço da gasolina (R$/Litro) *"
          value={inputs.fuelPrice}
          onChangeText={handleFuelPriceChange}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.fuelPrice}
        />
        {errors.fuelPrice && <Text style={styles.errorText}>{errors.fuelPrice}</Text>}
        <TextInput
          label="Consumo da gasolina (KM/Litro) *"
          value={inputs.fuelConsumption}
          onChangeText={(value) => handleChange(value, 'fuelConsumption')}
          keyboardType="numeric"
          style={styles.input}
          error={!!errors.fuelConsumption}
        />
        {errors.fuelConsumption && <Text style={styles.errorText}>{errors.fuelConsumption}</Text>}
        <Button
          mode="contained"
          onPress={calculateCostPerKM}
          style={styles.button}
        >
          Calcular
        </Button>
        {costPerKM !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Custo por KM: R${costPerKM}</Text>
          </View>
        )}
        {minPricePerKM !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Preço Mínimo por KM: R${minPricePerKM}</Text>
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

export default CalculadoraKM;
