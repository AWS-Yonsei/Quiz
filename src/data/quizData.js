const quizData = [
  {
    question: '당뇨병 환자가 해서는 안 되는 활동은?',
    options: [
      '과도한 당 섭취',
      '규칙적인 운동',
      '정기적인 혈압 체크',
      '급격한 체중 감소 시도',
    ],
    correctAnswer1: '과도한 당 섭취',
    correctAnswer: '과도한 당 섭취',
    reason: '과도하게 당을 섭취하면 당뇨가 더욱 악화될 수 있기 때문이다.',
  },
  {
    question: '고혈압 환자의 식이 권장사항에 해당하는 음식은?',
    options: [
      '과자와 단 음료',
      '고칼로리 음식',
      '저염분 식품',
      '고지방 음식',
    ],
    correctAnswer1: '저염분 식품',
    correctAnswer: '과도한 당 섭취',
    reason: '과도하게 당을 섭취하면 당뇨가 더욱 악화될 수 있기 때문이다.',
  },
  {
    question: '비만은 어떤 건강 문제와 관련이 있는가?',
    options: [
      '심장병',
      '갑상선 기능 저하',
      '타액 분비 부족',
      '무기력증',
    ],
    correctAnswer1: '심장병',
    correctAnswer: '저염분 식품',
    reason: '저염분 식품은 고혈압 환자의 혈압을 유지하는 데 도움이 될 수 있다.',
  },
  {
    question: '고령자가 뼈 건강을 유지하기 위해 권장되는 비타민은?',
    options: [
      '비타민 A',
      '비타민 C',
      '비타민 D',
      '비타민 K',
    ],
    correctAnswer1: '비타민 D',
    correctAnswer: '심장병',
    reason: '비만은 심장병과 같은 심혈관 질환의 위험을 증가시킬 수 있다.',
  },
  {
    question: '관절염을 완화하는 데 도움이 되는 음식은?',
    options: [
      '초콜릿',
      '토마토',
      '생선 오일',
      '생강 차',
    ],
    correctAnswer1: '생선 오일',
    correctAnswer: '비타민 D',
    reason: '고령자가 비타민 D를 섭취하면 뼈 건강을 유지하는 데 도움이 될 수 있다.',
  },
  {
    question: '흡연은 어떤 질병 위험을 증가시킬 수 있나요?',
    options: [
      '간암',
      '폐렴',
      '만성폐쇄성 폐질환 (COPD)',
      '신부전',
    ],
    correctAnswer1: '만성폐쇄성 폐질환 (COPD)',
    correctAnswer: '생선 오일',
    reason: '생선 오일에 포함된 오메가-3 지방산은 관절염 증상을 완화하는 데 도움이 될 수 있다.',
  },
  {
    question: '갑상선 기능저하증의 증상으로 옳지 않은 것은?',
    options: [
      '체중 감소',
      '피로감',
      '우울감',
      '냉방이 심한 환경에서 땀이 많이 나는 증상',
    ],
    correctAnswer1: '체중 감소',
    correctAnswer: '만성폐쇄성 폐질환 (COPD)',
    reason: '흡연은 만성폐쇄성 폐질환 (COPD)과 같은 호흡기 질환의 발병 위험을 증가시킬 수 있다.',
  },
  {
    question: '여성의 골다공증 예방을 위한 방법은?',
    options: [
      '칼슘 섭취 증가',
      '햇볕에 자주 노출',
      '스쿼트 운동',
      '종아리 근육 강화 운동',
    ],
    correctAnswer1: '햇볕에 자주 노출',
    correctAnswer: '체중 감소',
    reason: '갑상선 기능저하증은 체중 증가와 관련이 있을 수 있지만, 체중 감소와는 관련이 없다.',
  },
  {
    question: '스마트폰 사용이 불규칙할 경우 발생할 수 있는 문제는?',
    options: [
      '안구 건강 악화',
      '두통',
      '수면 장애',
      '모든 보기가 정답',
    ],
    correctAnswer1: '모든 보기가 정답',
    correctAnswer: '햇볕에 자주 노출',
    reason: '햇볕에 자주 노출하여 천연 비타민 D를 생성하면 골다공증 발병 위험을 줄일 수 있다.',
  },
  {
    question: '스트레스 관리를 위한 효과적인 방법은?',
    options: [
      '규칙적인 운동',
      '녹차 섭취',
      '수면 시간 확보',
      '모든 보기가 정답',
    ],
    correctAnswer1: '모든 보기가 정답',
    correctAnswer: '모든 보기가 정답',
    reason: '스마트폰 사용이 불규칙하면 안구 건강 악화, 두통, 수면 장애 등의 문제가 발생할 수 있다.',
  },
];

export default quizData;
