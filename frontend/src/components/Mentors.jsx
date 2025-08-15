import React from "react";

const mentorsHeads = [
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743660416/Prof._Dr._Shashi_K._Jain_suhcb0.png",
    name: "Prof.(Dr.) Shashi K. Jain",
    role: "COUNCIL HEAD",
    quote: "Empowering students to lead and innovate",
  },
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743660404/Dr._Kavita_Burse_wja9mi.png",
    name: "Dr. Kavita Burse",
    role: "PROFESSIONAL DEVELOPMENT MENTOR",
    quote: "Fostering professional growth and excellence",
  },
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743660413/Prof._Pankaj_Patel_rnk5pf.png",
    name: "Prof. Pankaj Patel",
    role: "COUNCIL SUPERVISOR",
    quote: "Guiding with wisdom and experience",
  },
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743660404/Dr._Vivek_Sharma_xqtrai.png",
    name: "Dr. Vivek Sharma",
    role: "COUNCIL MENTOR",
    quote: "Nurturing leadership potential",
  },
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743660402/Dr._Anula_Khare_zcwprd.png",
    name: "Dr. Anula Khare",
    role: "COUNCIL ADVISOR",
    quote: "Building bridges to success",
  },
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743660406/Prof_Sumit_Vashishtha_qknwnh.png",
    name: "Dr. Sumit Vashishtha",
    role: "FACULTY COMMITTEE HEAD",
    quote: "Leading through collaboration",
  },
];

const subMentors = [
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743660405/Dr.Kiran_Pandey_xxbxst.png",
    name: "Dr.Kiran Pandey",
  },
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743660402/Dr._Anurag_Paliwal_wzrh7j.png",
    name: "Dr. Anurag Paliwal",
  },
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743660406/Prof_Aarti_Shrivastava_nhllws.png",
    name: "Prof Aarti Shrivastava",
  },
  {
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743666290/Prof._Kavita_Singh_jbhmpg.png",
    name: "Prof. Kavita Singh",
  },
];

export default function Mentors() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center py-12 px-4">
      {/* Main Mentors */}
      
      <header className="w-full max-w-6xl text-center mb-8 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide">
          Our Mentors Heads
        </h1>
        <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
        </header>
        
      <div className="mx-auto">
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-fr">
          {mentorsHeads.map((mentor, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 p-6 rounded-lg text-center shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={mentor.img}
                alt={mentor.name}
                className="h-24 rounded-full object-cover border-4 border-teal-400 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-white mb-1">
                {mentor.name}
              </h3>
              <p className="text-lg text-teal-300 font-medium mb-3">
                {mentor.role}
              </p>
              {mentor.quote && (
                <p className="text-lg text-gray-400 italic bg-white/5 p-2 rounded">
                  "{mentor.quote}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sub Mentors */}
      <div className="mx-auto mt-10 flex flex-col item-center">
      
      <header className="w-full max-w-6xl text-center mb-8 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide">
          Our Mentors
        </h1>
        <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
        </header>
        
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-fr">
          {subMentors.map((mentor, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 p-4 rounded-lg text-center hover:scale-105 transition-transform"
            >
              <img
                src={mentor.img}
                alt={mentor.name}
                className="h-23 rounded-full object-cover border-4 border-teal-400 mx-auto mb-3"
              />
              <h3 className="text-2xl font-semibold text-white">
                {mentor.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
