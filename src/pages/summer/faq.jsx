import React, { useState } from 'react';

const faqData = [
  {
    question: "What are the dates for the Summer School 2025?",
    answer: "The program runs from 23rd July to 30th August, Monday to Saturday."
  },
  {
    question: "Where are the programs taking place?",
    answer: "All sessions will be held at Watford Islamic Centre, Leavesden Road Baptist Church, WD24 5ER."
  },
  {
    question: "Which age groups can register for each program?",
    answer: "* Qur'an Intensive: Ages 8–16\n* Summer Camp: Ages 4–11\n* Super Saturdays: Ages 4–16"
  },
  {
    question: "What are the daily start and end times for each session?",
    answer: "1. Qur'an Intensive: 9:00 AM – 12:00 PM (Mon–Fri)\n2. Summer Camp:\n* Morning: 9:00 AM – 12:00 PM\n* Afternoon: 1:00 PM – 4:00 PM\n3. Super Saturdays: 10:00 AM – 1:00 PM\n* Early Start (8am–9am): Available for Qur'an Intensive and Summer Camp students.\n* Late Finish (4pm–5pm): Available for Summer Camp only.\n* Both options have an additional cost – see the next question on program cost."
  },
  {
    question: "How much does each program cost?",
    answer: "* Qur'an Intensive: £18 per day\n* Summer Camp: £18 half day / £30 full day\n* Super Saturdays: £20 per session\n* Early start/Late finish: £5 each "
  },
  {
    question: "Are there any discounts available?",
    answer: "Yes:\n* 10% off when booking a full week of Summer Camp (including half days) or Quran Intensive\n* 10% off when booking all 6 Super Saturdays\n* 5% off when booking more than one child"
  },
  {
    question: "Do you offer any scholarships or financial aid?",
    answer: "We offer a limited number of subsidised places. Please contact us directly to enquire about eligibility and availability."
  },
  {
    question: "What is included in the Qur'an Intensive program?",
    answer: "- Hifdh and how to memorise like a pro\n- Revision and consolidation of past surahs\n- A study of Imam Nawawi's Etiquettes of a Qur'an Carrier\n- Intensive overview of Tajweed rules with practical application\n- Team activities to build strong brotherhood/sisterhood"
  },
  {
    question: "What activities are offered in the Summer Camp?",
    answer: "- Islamic manners and etiquettes\n- Stories of the Prophets and Seerah\n- Daily Duas and Salah\n- Qur'an and Qāʿidah revision\n- The pillars of Islam and Imaan\n- Multi-sports and VR games"
  },
  {
    question: "What topics and activities are covered in Super Saturdays?",
    answer: "FOR KIDS & JUNIORS\n- Stories of the Prophets, \n- lslamic manners\n- Love for Allah\n- Role play and Drama \n- Team bonding games\n- Creative arts & crafts \nTEEN BOYS & TEEN GIRLS\n- Inspiring moments from the Seerah\n- Responsibilities of adulthood\n- Inner dimensions of Salah\n- Dutifulness to parents\n- Competitive Sports"
  },
  {
    question: "Can my child attend more than one program?",
    answer: "* Children aged 8-11 can combine between all programs. \n* Children aged 4-7 can combine between the Summer Camp and Super Saturdays.\n* Children aged 12 and above can combine between Quran Intensive and Super Saturdays."
  },
  {
    question: "How do I register my child for the program?",
    answer: "Registration is online via our step-by-step form. You'll be guided through entering child details, selecting programs and choosing your payment method."
  },
  {
    question: "What happens after I submit the registration form?",
    answer: "You will then be redirected to the payment gateway.\nOnce payment has been confirmed, you will receive a follow-up email with:\n* A medical information form to complete for your children\n* A link to join our Summer at WIC Parents WhatsApp group"
  },
  {
    question: "How will I know my child's place is confirmed?",
    answer: "Your child's place is only confirmed once payment is made and you receive the follow up email your child's space is secured.. Spaces are limited and processed on a first-come, first-served basis. In rare cases where payment is taken but no spaces are available, we will contact you directly to discuss alternative program options or arrange a full refund where necessary."
  },
  {
    question: "What clothes should my child wear?",
    answer: "Children should wear modest, comfortable clothing suitable for physical activities. Trainers are recommended for sports sessions."
  },
  {
    question: "Does my child need a packed lunch?",
    answer: "Yes. Children attending full-day sessions or afternoon Summer Camp must bring a nut-free packed lunch and water bottle."
  },
  {
    question: "Are you serving food on site?",
    answer: "No meals will be provided on site. Please ensure children come with their own snacks and lunch."
  },
  {
    question: "Is a medical form required before my child can attend?",
    answer: "Yes. A medical and emergency contact form must be completed before the first day of attendance. This will be emailed to you after registration."
  },
  {
    question: "Are your staff DBS trained?",
    answer: "Yes. All staff and volunteers are enhanced DBS checked, trained in safeguarding and child protection, and qualified in basic first aid to ensure a safe environment for all children."
  },
  {
    question: "How can I get in touch with you?",
    answer: "📧 Email: info@watfordislamiccentre.com\n📞 Call/WhatsApp: 0774 831 8212\n📱 Instagram: @watfordislamiccentre"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-blue-50 to-white font-sans">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-primary relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 drop-shadow-lg">
            Everything you need to know about the Summer at WIC programme
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-lg text-gray-800">
                  {faq.question}
                </span>
                <span className="ml-4 text-primary text-2xl select-none">
                  {openIndex === index ? '▲' : '▼'}
                </span>
              </button>
              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-6 py-4 bg-gray-50">
                  <div className="text-gray-700 whitespace-pre-line">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 