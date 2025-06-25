import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-blue-50 to-white font-sans">
      <section className="py-20 px-4 text-center bg-primary relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Summer at WIC – Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 drop-shadow-lg">
            Please read carefully before completing your child's registration.
          </p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-green-800 mb-6">Summer Programme Terms & Conditions</h1>

          <h2 className="text-lg font-semibold text-green-700 mb-2">1. Attendance Policy</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I understand that regular attendance is mandatory for my child's successful completion of the summer program.</li>
            <li>I will ensure my child attends all scheduled classes and activities.</li>
            <li>I understand that if my child arrives more than 15 minutes late they may not be permitted to join the current session until the break time.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">2. Behavior Expectations</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I will ensure my child adheres to the program's code of conduct.</li>
            <li>I understand that disruptive behavior may result in disciplinary actions, including removal from the program.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">3. Health and Safety</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I confirm that my child is in good health and able to participate in all activities.</li>
            <li>I will provide up-to-date medical information, including any allergies or conditions that may require special attention.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">4. Emergency Contact Information</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I will provide accurate and current emergency contact information.</li>
            <li>I authorise the program to seek medical treatment for my child in case of an emergency if I cannot be reached.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">5. Academic Expectations</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I understand that my child is expected to complete all assignments and participate in all classroom activities.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">6. Fees and Payments</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I agree to pay all required fees for my child's participation in the summer program.</li>
            <li>I understand that failure to pay these fees may result in my child being removed from the program.</li>
            <li>I understand refunds are only permitted prior to the start date of the program, regardless of failure to attend.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">7. Liability Waiver</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I release the summer program and its staff from any liability for injuries or accidents that may occur during the program, except in cases of gross negligence.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">8. Media Release</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I give permission for my child to be photographed or filmed during summer program activities for promotional purposes.</li>
            <li>I understand that these images may be used in program publications, websites, and social media.</li>
            <li>I understand that if I wish for my child to NOT be used in promotional material I must write to info@watfordislamiccentre.com to confirm this.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">9. Drop off & Collection</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I will ensure my child has reliable transport to and from the summer program.</li>
            <li>I understand that the school is not responsible for my child outside of program hours.</li>
            <li>If anyone other than the named guardian on the registration form is collecting a child, I will inform the program staff in advance.</li>
            <li>I will ensure my child is dropped off and collected on time.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">10. Technology Use</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I agree to my child's use of school-provided technology and internet resources according to the program's acceptable use policy.</li>
            <li>I understand that misuse of technology can result in disciplinary action.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">11. Parent Involvement</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I commit to staying informed about my child's progress and participating in parent meetings or conferences as needed.</li>
            <li>I will support my child's learning and involvement in the program.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">12. Anti‑Bullying</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I acknowledge the centre's zero‑tolerance approach to bullying in all forms.</li>
            <li>I will encourage my child to report concerns and will inform staff immediately of any issues.</li>
            <li>I understand confirmed bullying may lead to behavior plans, suspension, or exclusion.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">13. Trips, Outings & Visits</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>I will sign separate consent forms for off‑site activities and provide any additional medical or travel details requested.</li>
            <li>I will ensure my child arrives with suitable clothing, lunch, and equipment.</li>
            <li>I understand serious misbehaviour on trips may require my child to be returned early at my expense.</li>
          </ul>

          <h2 className="text-lg font-semibold text-green-700 mb-2">14. Environmental Commitment</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>I will support the centre's efforts to reduce waste (e.g., reusable containers, minimal single‑use plastics).</li>
            <li>I will provide healthy, nut‑free snacks and lunches in line with centre guidelines.</li>
            <li>I encourage my child to respect resources and participate in eco‑friendly activities.</li>
          </ul>
        </div>
      </section>
    </div>
  );
} 