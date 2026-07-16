// بيانات تجريبية لعرض شكل الداشبورد قبل رفع بيانات حقيقية

export const sampleStudents = [
  { id: 1, name: 'Student_1', continuousAssessment: 78, finalExam: 82, clo1: 75, clo2: 80, clo3: 70, riskStatus: 'Low Risk' },
  { id: 2, name: 'Student_2', continuousAssessment: 45, finalExam: 38, clo1: 40, clo2: 35, clo3: 30, riskStatus: 'High Risk' },
  { id: 3, name: 'Student_3', continuousAssessment: 88, finalExam: 91, clo1: 85, clo2: 90, clo3: 88, riskStatus: 'Low Risk' },
  { id: 4, name: 'Student_4', continuousAssessment: 62, finalExam: 58, clo1: 60, clo2: 55, clo3: 50, riskStatus: 'Medium Risk' },
  { id: 5, name: 'Student_5', continuousAssessment: 55, finalExam: 48, clo1: 50, clo2: 45, clo3: 40, riskStatus: 'Medium Risk' },
  { id: 6, name: 'Student_6', continuousAssessment: 92, finalExam: 89, clo1: 90, clo2: 92, clo3: 85, riskStatus: 'Low Risk' },
  { id: 7, name: 'Student_7', continuousAssessment: 38, finalExam: 30, clo1: 35, clo2: 28, clo3: 25, riskStatus: 'High Risk' },
  { id: 8, name: 'Student_8', continuousAssessment: 70, finalExam: 74, clo1: 72, clo2: 68, clo3: 70, riskStatus: 'Low Risk' },
]

// ملخص KPIs العلوي (البطاقات)
export const sampleSummary = {
  totalStudents: 60,
  passRate: 84,
  averageGrade: 76.2,
  atRiskCount: 12,
}

// توزيع الخطر (Pie Chart)
export const sampleRiskDistribution = [
  { name: 'منخفض الخطر', value: 38, color: '#22c55e' },
  { name: 'متوسط الخطر', value: 10, color: '#f59e0b' },
  { name: 'عالي الخطر', value: 12, color: '#ef4444' },
]

// إتقان مخرجات التعلم (Bar Chart)
export const sampleCLOMastery = [
  { clo: 'CLO1', mastered: 44, total: 60 },
  { clo: 'CLO2', mastered: 48, total: 60 },
  { clo: 'CLO3', mastered: 40, total: 60 },
]

// توصيات الذكاء الاصطناعي
export const sampleRecommendations = {
  ar: [
    {
      id: 1,
      title: 'ضعف إتقان CLO3',
      reason: 'نسبة إتقان الطلاب لهذا المخرج أقل من المتوسط (67%)',
      action: 'تفعيل ورشة عملية تطبيقية على المفاهيم التحليلية المرتبطة بـ CLO3',
    },
    {
      id: 2,
      title: 'غياب متكرر لدى فئة عالية الخطر',
      reason: '12 طالب مصنفين ضمن High Risk بسبب انخفاض الحضور والتقييم المستمر',
      action: 'تفعيل بروتوكول الإنذار الأكاديمي والتواصل المباشر مع المرشد الأكاديمي',
    },
    {
      id: 3,
      title: 'تميز أكاديمي ملحوظ',
      reason: 'مجموعة من الطلاب حققوا أداء يفوق المعدل المستهدف بثبات',
      action: 'ترشيحهم كموجهين أكاديميين (Peer Mentors) لدعم زملائهم',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Weak Mastery of CLO3',
      reason: 'Student mastery rate for this outcome is below average (67%)',
      action: 'Activate a hands-on workshop on the analytical concepts related to CLO3',
    },
    {
      id: 2,
      title: 'Recurring Absence in High-Risk Group',
      reason: '12 students classified as High Risk due to low attendance and continuous assessment',
      action: 'Activate the academic warning protocol and direct communication with the academic advisor',
    },
    {
      id: 3,
      title: 'Notable Academic Excellence',
      reason: 'A group of students consistently achieved performance above the target average',
      action: 'Nominate them as Peer Mentors to support their classmates',
    },
  ],
}