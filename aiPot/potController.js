import dotenv from 'dotenv';
dotenv.config();

// استيراد مكتبة Together AI
import Together from "together-ai";

// إنشاء كائن من مكتبة Together
const together = new Together({ apiKey: '91bebf5745ef05b2c1f63eb9661384fc03ff8bbe3c36a9fb084815d001fd3c99' });

async function generatePlan(userData) {
  const prompt = `
    أنشئ خطة غذائية وتمارين مخصصة لشخص بالمواصفات التالية:
    - العمر: ${userData.age}
    - الوزن: ${userData.weight} كجم
    - الطول: ${userData.height} سم
    - الهدف: ${userData.goal}
    - عدد أيام التمرين أسبوعيًا: ${userData.workout_days}

    **المتطلبات:**
    ✅ كل يوم يكون فيه **3 وجبات متنوعة** بحيث لا تتكرر كثيرًا.
    ✅ التمارين تكون موزعة بناءً على عدد الأيام بحيث يكون هناك **تغيير في التمارين**.
    ✅ لا تكرر نفس الوجبات أو التمارين في كل يوم.
    ✅ لا تستخدم نفس المثال اللذى ساعطيه لك.
    ✅ اعطنى كل وجبه بوزنها.

    **الإخراج يكون JSON فقط مثل هذا:**
    **لا تستخدم هذا المثال بنفس الوجبات المثال لتوضيح شكل الاخراج فقط**
    {
      "plan": [
        {
          "day": "السبت",
          "meals": [
            {"name": "الإفطار", "items": ["بيض مسلوق", "توست بني", "حليب قليل الدسم"]},
            {"name": "الغداء", "items": ["دجاج مشوي", "أرز بني", "سلطة"]},
            {"name": "العشاء", "items": ["زبادي يوناني", "لوز", "تفاح"]}
          ],
          "workout": ["سكوات", "ضغط", "تمارين بطن"]
        },
        {
          "day": "الأحد",
          "meals": [
            {"name": "الإفطار", "items": ["شوفان", "موز", "لبن"]},
            {"name": "الغداء", "items": ["سمك مشوي", "بطاطا مشوية", "بروكلي"]},
            {"name": "العشاء", "items": ["تونة", "توست", "خيار"]}
          ],
          "workout": ["رفعة ميتة", "كارديو", "تمارين الكتف"]
        }
      ]
    }
  `;

  try {
    // إرسال الطلب إلى API باستخدام المكتبة
    const response = await together.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });

    // استخراج محتوى الخطة الغذائية والتمارين من الاستجابة
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("❌ خطأ في الاتصال بـ Together API:", error.message);
    return { error: "فشل في الاتصال بـ Together API" };
  }
}

export { generatePlan };
