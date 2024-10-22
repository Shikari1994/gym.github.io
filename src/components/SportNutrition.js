import React, { useState } from 'react';

const supplementsData = [
  {
    name: 'Протеин',
    description: 'Протеин способствует набору мышечной массы и восстановлению после тренировок. Рекомендуется употреблять 1.2–2.2 г на килограмм массы тела после тренировки или в течение дня для достижения необходимой суточной нормы.',
  },
  {
    name: 'Креатин',
    description: 'Креатин увеличивает силу, выносливость и способствует росту мышечной массы. Рекомендуемая доза — 3-5 г в день, независимо от массы тела, или 0.03 г на килограмм массы тела.',
  },
  {
    name: 'BCAA',
    description: 'BCAA (аминокислоты с разветвлённой цепью) помогают восстановить мышцы и предотвратить их разрушение во время тренировок. Оптимальная доза — 0.1 г на килограмм массы тела до или после тренировки.',
  },
  {
    name: 'Л-карнитин',
    description: 'Л-карнитин помогает в сжигании жира и увеличении общей выносливости. Рекомендуется принимать 0.5–2 г в день, особенно перед тренировкой для максимального эффекта.',
  },
  {
    name: 'Омега-3',
    description: 'Омега-3 жирные кислоты улучшают здоровье сердца и мозга, а также способствуют восстановлению мышц. Рекомендуется принимать 250–500 мг в день в виде добавок или из пищи (рыбий жир).',
  },
  {
    name: 'Витамин D',
    description: 'Витамин D важен для здоровья костей и иммунной системы. Рекомендуемая доза — 2000-5000 МЕ в день, в зависимости от уровня дефицита и массы тела.',
  },
  {
    name: 'Витамины группы B',
    description: 'Витамины группы B способствуют повышению энергии, улучшению обмена веществ и снижению стресса. Рекомендуется принимать комплекс витаминов группы B согласно инструкции (обычно 1 таблетка в день).',
  },
  {
    name: 'Магний',
    description: 'Магний важен для восстановления мышц, улучшения сна и регулирования уровня сахара в крови. Оптимальная доза — 5-10 мг на килограмм массы тела в день, лучше перед сном.',
  },
  {
    name: 'Цинк',
    description: 'Цинк способствует поддержанию здоровья иммунной системы и уровня тестостерона. Рекомендуемая доза — 0.1–0.15 мг на килограмм массы тела в день.',
  },
  {
    name: 'Глютамин',
    description: 'Глютамин ускоряет восстановление мышц и помогает снизить болезненные ощущения после тренировок. Рекомендуется принимать 0.1 г на килограмм массы тела после тренировки.',
  },
  {
    name: 'Цитруллин',
    description: 'Цитруллин улучшает кровообращение и помогает уменьшить усталость во время тренировок. Оптимальная доза — 6-8 г за 30-60 минут до тренировки.',
  },
  {
    name: 'Аргинин',
    description: 'Аргинин способствует расширению кровеносных сосудов и улучшению кровотока. Рекомендуется принимать 0.05–0.1 г на килограмм массы тела перед тренировкой.',
  },
  {
    name: 'Бета-аланин',
    description: 'Бета-аланин повышает выносливость и уменьшает накопление молочной кислоты в мышцах. Оптимальная доза — 0.05–0.1 г на килограмм массы тела в день, разделенная на несколько приёмов.',
  },
  {
    name: 'Гейнер',
    description: 'Гейнер содержит углеводы и белки для набора массы и восстановления после тренировок. Рекомендуется принимать 1-2 г на килограмм массы тела после тренировки в зависимости от целей и суточной калорийности.',
  },
];


const SportContent = ({ onClose }) => {
  const [openItems, setOpenItems] = useState([]);
  const [weight, setWeight] = useState(0); // Состояние для хранения веса
  const [doses, setDoses] = useState({}); // Состояние для хранения рассчитанных доз

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((itemIndex) => itemIndex !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const calculateDoses = () => {
    const newDoses = {};
    supplementsData.forEach(item => {
      // Используем регулярное выражение для извлечения диапазона дозировки
      const rangeMatch = item.description.match(/([0-9]*[.,]?[0-9]+)\s*-\s*([0-9]*[.,]?[0-9]+)\s*(г|мг|МЕ)?/);
      if (rangeMatch) {
        const minDose = parseFloat(rangeMatch[1].replace(',', '.'));
        const maxDose = parseFloat(rangeMatch[2].replace(',', '.'));
        // Рассчитываем дозы на основе веса
        const minCalculatedDose = (minDose * weight).toFixed(2);
        const maxCalculatedDose = (maxDose * weight).toFixed(2);
        newDoses[item.name] = {
          min: minCalculatedDose,
          max: maxCalculatedDose,
        };
      } else {
        // Если не найден диапазон, ищем одно значение
        const singleMatch = item.description.match(/([0-9]*[.,]?[0-9]+)(?=\s*(г|мг|МЕ))/);
        if (singleMatch) {
          const dose = parseFloat(singleMatch[0].replace(',', '.'));
          newDoses[item.name] = {
            min: (dose * weight * 0.8).toFixed(2), // Задаем минимальную дозу, например, 80% от одной дозы
            max: (dose * weight * 1.2).toFixed(2), // Задаем максимальную дозу, например, 120% от одной дозы
          };
        }
      }
    });
    setDoses(newDoses);
  };

  return (
    <div style={{ padding: '10px', maxHeight: '450px', overflowY: 'auto', border: '1px solid #ccc' }}>
      <div>
        <label>
          Введите ваш вес (в кг):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            onBlur={calculateDoses}
            style={{ marginLeft: '10px', marginBottom: '10px' }}
          />
        </label>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {supplementsData.map((item, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <div
              onClick={() => toggleItem(index)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px',
                backgroundColor: '#cfcfcf',
                borderRadius: '4px',
              }}
            >
              <span>{item.name}</span>
              <span>{openItems.includes(index) ? '🔽' : '▶️'}</span>
            </div>
            {openItems.includes(index) && (
              <div style={{ marginTop: '5px', paddingLeft: '10px' }}>
                <p>{item.description}</p>
                {weight > 0 && (
                  <p>
                    Рекомендуемая доза для вашего веса: {doses[item.name]?.min} г - {doses[item.name]?.max} г
                  </p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportContent;

