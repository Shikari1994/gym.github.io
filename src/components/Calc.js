import React, { useState } from 'react';
import { Button } from '@react95/core';

const Calculator = () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [bodyWeight, setBodyWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState(''); // Добавлено для возраста
  const [gender, setGender] = useState(''); // Добавлено для пола
  const [activityLevel, setActivityLevel] = useState(''); // Добавлено для активности
  const [result, setResult] = useState(null);
  const [proteinResult, setProteinResult] = useState(null);
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmr, setBMR] = useState(null); // Результат BMR
  const [tdee, setTDEE] = useState(null); // Результат TDEE

  const [show1RM, setShow1RM] = useState(false);
  const [showProtein, setShowProtein] = useState(false);
  const [showBMI, setShowBMI] = useState(false);
  const [showCalories, setShowCalories] = useState(false); // Состояние для отображения калорий

  const calculate1RM = () => {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps, 10);

    if (!isNaN(weightNum) && !isNaN(repsNum) && repsNum > 0) {
      const oneRM = (weightNum * repsNum * 0.0333) + weightNum;
      setResult(oneRM.toFixed(2));
    } else {
      alert('Пожалуйста, введите действительные значения для веса и повторений.');
    }
  };

  const calculateProteinIntake = () => {
    const bodyWeightNum = parseFloat(bodyWeight);

    if (!isNaN(bodyWeightNum) && bodyWeightNum > 0) {
      const minProtein = (1.6 * bodyWeightNum).toFixed(2);
      const maxProtein = (2.2 * bodyWeightNum).toFixed(2);
      setProteinResult({ min: minProtein, max: maxProtein });
    } else {
      alert('Пожалуйста, введите действительное значение для массы тела.');
    }
  };

  const calculateBMI = () => {
    const bodyWeightNum = parseFloat(bodyWeight);
    const heightNum = parseFloat(height) / 100;

    if (!isNaN(bodyWeightNum) && bodyWeightNum > 0 && !isNaN(heightNum) && heightNum > 0) {
      const bmi = bodyWeightNum / (heightNum * heightNum);
      setBmiResult(bmi.toFixed(2));

      if (bmi < 18.5) {
        setBmiCategory('Недостаточная масса тела');
      } else if (bmi >= 18.5 && bmi < 25) {
        setBmiCategory('Нормальная масса тела');
      } else if (bmi >= 25 && bmi < 30) {
        setBmiCategory('Избыточная масса тела (ожирение I степени)');
      } else if (bmi >= 30 && bmi < 35) {
        setBmiCategory('Ожирение II степени');
      } else {
        setBmiCategory('Ожирение III степени (морбидное ожирение)');
      }
    } else {
      alert('Пожалуйста, введите корректные значения массы тела и роста.');
      setBmiResult(null);
      setBmiCategory('');
    }
  };

  const calculateBMRandTDEE = () => {
    const bodyWeightNum = parseFloat(bodyWeight);
    const heightNum = parseFloat(height) / 100; // Рост в метрах
    const ageNum = parseInt(age, 10);
    const activityMultiplier = parseFloat(activityLevel);

    if (!isNaN(bodyWeightNum) && !isNaN(heightNum) && !isNaN(ageNum) && activityMultiplier > 0) {
      let bmr;
      if (gender === 'male') {
        bmr = 88.36 + (13.4 * bodyWeightNum) + (4.8 * heightNum * 100) - (5.7 * ageNum);
      } else if (gender === 'female') {
        bmr = 447.6 + (9.2 * bodyWeightNum) + (3.1 * heightNum * 100) - (4.3 * ageNum);
      } else {
        alert('Пожалуйста, выберите пол.');
        return;
      }

      const tdee = bmr * activityMultiplier;
      setBMR(bmr.toFixed(2));
      setTDEE(tdee.toFixed(2));
    } else {
      alert('Пожалуйста, введите корректные значения для веса, роста, возраста и уровня активности.');
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      

      <div style={{ maxHeight: '350px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {/* Иконка для переключения видимости блока расчета 1RM */}
        <div onClick={() => setShow1RM(!show1RM)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
          {show1RM ? '🔽 Скрыть расчет жима на раз' : '▶️ Показать расчет жима на раз'}
        </div>
        {show1RM && (
          <div style={{ marginBottom: '20px' }}>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Вес (кг)"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="Повторения"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
            <Button onClick={calculate1RM}>Рассчитать жим на раз</Button>

            {result !== null && (
              <div>
                <h4>Ваш жим на одно повторение: {result} кг</h4>
              </div>
            )}
          </div>
        )}

        {/* Иконка для переключения видимости блока расчета белка */}
        <div onClick={() => setShowProtein(!showProtein)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
          {showProtein ? '🔽 Скрыть расчет белка' : '▶️ Показать расчет белка'}
        </div>
        {showProtein && (
          <div style={{ marginBottom: '20px' }}>
            <input
              type="number"
              value={bodyWeight}
              onChange={(e) => setBodyWeight(e.target.value)}
              placeholder="Масса тела (кг)"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
            <Button onClick={calculateProteinIntake}>Рассчитать белок</Button>

            {proteinResult !== null && (
              <div>
                <h4>
                  Вам нужно {proteinResult.min} - {proteinResult.max} грамм белка в день
                </h4>
              </div>
            )}
          </div>
        )}

        {/* Иконка для переключения видимости блока расчета ИМТ */}
        <div onClick={() => setShowBMI(!showBMI)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
          {showBMI ? '🔽 Скрыть расчет ИМТ' : '▶️ Показать расчет ИМТ'}
        </div>
        {showBMI && (
          <div style={{ marginBottom: '20px' }}>
            <input
              type="number"
              value={bodyWeight}
              onChange={(e) => setBodyWeight(e.target.value)}
              placeholder="Масса тела (кг)"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Рост (см)"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
            <Button onClick={calculateBMI}>Рассчитать ИМТ</Button>

            {bmiResult !== null && (
              <div>
                <h4>Ваш ИМТ: {bmiResult}</h4>
                <h4>Категория: {bmiCategory}</h4>
              </div>
            )}
          </div>
        )}

        {/* Иконка для переключения видимости блока расчета калорий */}
        <div onClick={() => setShowCalories(!showCalories)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
          {showCalories ? '🔽 Скрыть расчет калорий' : '▶️ Показать расчет калорий'}
        </div>
        {showCalories && (
          <div style={{ marginBottom: '20px' }}>
            <input
              type="number"
              value={bodyWeight}
              onChange={(e) => setBodyWeight(e.target.value)}
              placeholder="Масса тела (кг)"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Рост (см)"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Возраст"
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ marginRight: '10px', marginBottom: '10px' }}>
              <option value="">Выберите пол</option>
              <option value="male">Мужчина</option>
              <option value="female">Женщина</option>
            </select>
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} style={{ marginRight: '10px', marginBottom: '10px' }}>
              <option value="">Выберите уровень активности</option>
              <option value="1.2">Сидячий образ жизни</option>
              <option value="1.375">Легкая активность</option>
              <option value="1.55">Умеренная активность</option>
              <option value="1.725">Высокая активность</option>
              <option value="1.9">Очень высокая активность</option>
            </select>
            <Button onClick={calculateBMRandTDEE}>Рассчитать калории</Button>

            {bmr !== null && (
              <div>
                <h4>Ваш BMR (расчет количества калорий, которое ваше тело использует в состоянии покоя): {bmr} калорий в день</h4>
              </div>
            )}

            {tdee !== null && (
              <div>
                <h4>Ваш TDEE (суточная потребность в калориях с учетом активности): {tdee} калорий в день</h4>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
