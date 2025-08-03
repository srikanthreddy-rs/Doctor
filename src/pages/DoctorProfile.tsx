
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Star, Phone, Mail, Award, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock doctor data (same as in Index.tsx)
const doctors = [
  {
    id: 1,
    name: "Dr. Aisha Patel",
    specialization: "Cardiologist",
    rating: 4.9,
    experience: "15 years",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    availability: "Available Today",
    status: "available",
    location: "Heart Care Center, Mumbai",
    price: "$150",
    nextSlot: "Today 3:00 PM",
    bio: "Expert in interventional cardiology and heart failure management.",
    education: "MBBS from AIIMS, DM Cardiology at PGIMER",
    languages: ["English", "Hindi", "Gujarati"],
    phone: "(555) 111-2233",
    email: "aisha.patel@heartcare.com",
    address: "22 Cardio Street, Mumbai, MH 400001",
    achievements: [
      "Best Cardiologist Award 2022",
      "Member of Indian Heart Association"
    ],
    timeSlots: {
      today: ["3:00 PM", "4:00 PM"],
      tomorrow: ["11:00 AM", "2:00 PM"],
      dayAfter: ["10:30 AM", "1:00 PM"]
    }
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    rating: 4.7,
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    availability: "Available Tomorrow",
    status: "available",
    location: "Neuro Clinic, Bangalore",
    price: "$130",
    nextSlot: "Tomorrow 11:00 AM",
    bio: "Specialist in epilepsy, stroke and movement disorders.",
    education: "MD from JIPMER, DM Neurology from NIMHANS",
    languages: ["English", "Kannada", "Tamil"],
    phone: "(555) 222-4455",
    email: "ravi.menon@neuroclinic.com",
    address: "12 Brain Lane, Bangalore, KA 560001",
    achievements: [
      "Top Neurologist South India 2023",
      "Speaker at Global Neuro Conference"
    ],
    timeSlots: {
      today: [],
      tomorrow: ["11:00 AM", "1:30 PM", "3:30 PM"],
      dayAfter: ["10:00 AM", "12:00 PM"]
    }
  },
  {
    id: 3,
    name: "Dr. Emily Turner",
    specialization: "Pediatrician",
    rating: 4.6,
    experience: "9 years",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273c?w=400&h=400&fit=crop&crop=face",
    availability: "Available Day After",
    status: "available",
    location: "Children's Health Hospital, New York",
    price: "$100",
    nextSlot: "Day After 9:00 AM",
    bio: "Committed to children's health and wellness with a caring touch.",
    education: "MD from Harvard Medical School, Residency at Boston Children's Hospital",
    languages: ["English", "Spanish"],
    phone: "(555) 333-5566",
    email: "emily.turner@childhealth.com",
    address: "456 Kids Lane, NY 10001",
    achievements: [
      "Pediatric Research Excellence Award",
      "Author of Child Wellness Handbook"
    ],
    timeSlots: {
      today: [],
      tomorrow: [],
      dayAfter: ["9:00 AM", "11:00 AM", "2:00 PM"]
    }
  },
  {
    id: 4,
    name: "Dr. Suraj Shah",
    specialization: "Orthopedic Surgeon",
    rating: 4.8,
    experience: "14 years",
    image: "https://images.unsplash.com/photo-1612349317150-8d88807e04b9?w=400&h=400&fit=crop&crop=face",
    availability: "Available Today",
    status: "available",
    location: "Bone & Joint Clinic, Pune",
    price: "$140",
    nextSlot: "Today 5:00 PM",
    bio: "Focused on minimally invasive joint replacements and sports injuries.",
    education: "MS Ortho from KEM Hospital, Fellowship in Germany",
    languages: ["English", "Marathi", "Hindi"],
    phone: "(555) 444-6677",
    email: "suraj.shah@orthoclinic.com",
    address: "99 Bone Way, Pune, MH 411001",
    achievements: [
      "Fast Recovery Surgeon 2023",
      "1000+ successful joint surgeries"
    ],
    timeSlots: {
      today: ["5:00 PM", "6:00 PM"],
      tomorrow: ["10:30 AM", "1:30 PM"],
      dayAfter: ["11:00 AM", "3:00 PM"]
    }
  },
  {
    id: 5,
    name: "Dr. Priya Mehta",
    specialization: "Gynecologist",
    rating: 4.5,
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
    availability: "Available Tomorrow",
    status: "available",
    location: "Women's Care Center, Delhi",
    price: "$110",
    nextSlot: "Tomorrow 2:00 PM",
    bio: "Expert in prenatal care, fertility consultation, and women's health.",
    education: "MBBS from MAMC, DGO from Safdarjung Hospital",
    languages: ["English", "Hindi"],
    phone: "(555) 555-7788",
    email: "priya.mehta@womenscare.com",
    address: "11 Femina Street, Delhi 110001",
    achievements: [
      "Young Gynecologist Award 2021",
      "100+ Safe Deliveries per Year"
    ],
    timeSlots: {
      today: [],
      tomorrow: ["2:00 PM", "3:00 PM", "5:00 PM"],
      dayAfter: ["10:00 AM", "12:30 PM"]
    }
  },
  // You can add 10 more similarly...
{
    id: 6,
    name: "Dr. Ahmed El-Sayed",
    specialization: "Pulmonologist",
    rating: 4.7,
    experience: "13 years",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face",
    availability: "Available Day After",
    status: "available",
    location: "Respiratory Health Center, Cairo",
    price: "$95",
    nextSlot: "Day After 11:00 AM",
    bio: "Treats asthma, COPD, and other chronic lung conditions.",
    education: "MD, Cairo University; Fellowship in Pulmonology, Geneva",
    languages: ["Arabic", "English", "French"],
    phone: "(555) 987-1111",
    email: "ahmed.elsayed@lungspecialist.com",
    address: "15 Breath Blvd, Cairo, Egypt",
    achievements: [
      "Top Pulmonologist North Africa 2022",
      "Lung Health Awareness Advocate"
    ],
    timeSlots: {
      today: [],
      tomorrow: [],
      dayAfter: ["11:00 AM", "1:00 PM", "4:00 PM"]
    }
  },
  {
    id: 7,
    name: "Dr. Isabelle Moreau",
    specialization: "Psychiatrist",
    rating: 4.6,
    experience: "16 years",
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&h=400&fit=crop&crop=face",
    availability: "Available Tomorrow",
    status: "available",
    location: "MindCare Institute, Paris",
    price: "$160",
    nextSlot: "Tomorrow 2:00 PM",
    bio: "Focused on mental wellness, depression, and anxiety disorders.",
    education: "MD from Sorbonne University, Psychiatric Training in Lyon",
    languages: ["French", "English"],
    phone: "(555) 246-1357",
    email: "isabelle.moreau@mindcare.fr",
    address: "82 Rue de Santé, Paris, France",
    achievements: [
      "Mental Health Excellence Award",
      "UNICEF Mental Care Volunteer"
    ],
    timeSlots: {
      today: [],
      tomorrow: ["2:00 PM", "3:30 PM"],
      dayAfter: ["10:00 AM", "12:00 PM", "4:00 PM"]
    }
  },
  {
    id: 8,
    name: "Dr. Rajesh Khanna",
    specialization: "ENT Specialist",
    rating: 4.5,
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1594633318453-3b69b3d1ab1f?w=400&h=400&fit=crop&crop=face",
    availability: "Available Today",
    status: "available",
    location: "Ear Nose Throat Clinic, Chennai",
    price: "$80",
    nextSlot: "Today 4:30 PM",
    bio: "Experienced in sinus surgeries and hearing disorders.",
    education: "MBBS from SRMC, MS ENT at JIPMER",
    languages: ["English", "Tamil", "Telugu"],
    phone: "(555) 888-9999",
    email: "rajesh.khanna@entclinic.in",
    address: "34 MedPark Road, Chennai, TN 600001",
    achievements: [
      "Top Young ENT Surgeon 2021",
      "TEDx Speaker - ENT Awareness"
    ],
    timeSlots: {
      today: ["4:30 PM", "6:00 PM"],
      tomorrow: ["11:30 AM", "1:30 PM"],
      dayAfter: ["9:00 AM", "12:30 PM"]
    }
  },
  {
    id: 9,
    name: "Dr. Sophia Williams",
    specialization: "Oncologist",
    rating: 4.9,
    experience: "18 years",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face",
    availability: "Available Tomorrow",
    status: "available",
    location: "Hope Cancer Center, London",
    price: "$200",
    nextSlot: "Tomorrow 9:00 AM",
    bio: "Renowned for treating breast and lung cancers with compassion.",
    education: "MBBS from Cambridge, Oncology Fellowship at Johns Hopkins",
    languages: ["English", "German"],
    phone: "(555) 999-2323",
    email: "sophia.williams@hopecenter.uk",
    address: "10 Hope Street, London, UK",
    achievements: [
      "Royal Society Award for Oncology",
      "Author - “Hope Beyond Cancer”"
    ],
    timeSlots: {
      today: [],
      tomorrow: ["9:00 AM", "11:00 AM", "3:00 PM"],
      dayAfter: ["10:00 AM", "1:00 PM"]
    }
  },
  {
    id: 10,
    name: "Dr. Miguel Santos",
    specialization: "Urologist",
    rating: 4.4,
    experience: "7 years",
    image: "https://images.unsplash.com/photo-1628157588553-5ecf8d9f47b0?w=400&h=400&fit=crop&crop=face",
    availability: "Available Day After",
    status: "available",
    location: "GenitoCare Clinic, São Paulo",
    price: "$90",
    nextSlot: "Day After 10:30 AM",
    bio: "Specialist in urinary tract and reproductive health for men and women.",
    education: "MD from University of São Paulo, Residency in Rio",
    languages: ["Portuguese", "Spanish", "English"],
    phone: "(555) 765-3211",
    email: "miguel.santos@genitocare.br",
    address: "55 Saúde Ave, São Paulo, Brazil",
    achievements: [
      "Men's Health Advocate",
      "Guest Speaker at UroCon 2022"
    ],
    timeSlots: {
      today: [],
      tomorrow: [],
      dayAfter: ["10:30 AM", "12:00 PM", "3:30 PM"]
    }
  },
  {
    id: 11,
    name: "Dr. Karen Liu",
    specialization: "Endocrinologist",
    rating: 4.8,
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1622551874311-bdd5b4c3b55b?w=400&h=400&fit=crop&crop=face",
    availability: "Available Tomorrow",
    status: "available",
    location: "Hormone & Diabetes Center, Singapore",
    price: "$110",
    nextSlot: "Tomorrow 12:00 PM",
    bio: "Focused on diabetes, thyroid disorders, and hormonal imbalance.",
    education: "MBBS from NUS, Fellowship in Endocrinology, Australia",
    languages: ["English", "Mandarin"],
    phone: "(555) 444-2211",
    email: "karen.liu@endoclinic.sg",
    address: "101 Wellness St, Singapore",
    achievements: [
      "Asia Pacific Diabetes Award",
      "Telemedicine Pioneer for Endocrine Care"
    ],
    timeSlots: {
      today: [],
      tomorrow: ["12:00 PM", "2:00 PM", "4:00 PM"],
      dayAfter: ["9:30 AM", "11:00 AM"]
    }
  },
  {
    id: 12,
    name: "Dr. David Kim",
    specialization: "General Physician",
    rating: 4.3,
    experience: "5 years",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=face",
    availability: "Available Today",
    status: "available",
    location: "HealthFirst Clinic, Seoul",
    price: "$60",
    nextSlot: "Today 2:30 PM",
    bio: "Handles day-to-day illnesses and preventive care.",
    education: "MBBS, Seoul National University",
    languages: ["Korean", "English"],
    phone: "(555) 323-1122",
    email: "david.kim@healthfirst.kr",
    address: "20 Healthy Rd, Seoul, South Korea",
    achievements: [
      "Rapid Response Doctor of the Year",
      "Community Health Leader"
    ],
    timeSlots: {
      today: ["2:30 PM", "3:30 PM", "5:00 PM"],
      tomorrow: ["10:00 AM", "12:00 PM"],
      dayAfter: ["9:00 AM"]
    }
  },
  {
    id: 13,
    name: "Dr. Anita Roy",
    specialization: "Dentist",
    rating: 4.6,
    experience: "6 years",
    image: "https://images.unsplash.com/photo-1622551874300-6c129f2d315a?w=400&h=400&fit=crop&crop=face",
    availability: "Available Day After",
    status: "available",
    location: "Smile Dental Care, Kolkata",
    price: "$75",
    nextSlot: "Day After 10:00 AM",
    bio: "Specializes in cosmetic dentistry, root canal, and braces.",
    education: "BDS from RGUHS, MDS at NIDS",
    languages: ["Bengali", "English", "Hindi"],
    phone: "(555) 666-9090",
    email: "anita.roy@smilecare.in",
    address: "15 Smile Street, Kolkata, WB 700001",
    achievements: [
      "Bright Smile Award 2023",
      "300+ Smile Makeovers"
    ],
    timeSlots: {
      today: [],
      tomorrow: [],
      dayAfter: ["10:00 AM", "11:30 AM", "3:00 PM"]
    }
  },
  {
    id: 14,
    name: "Dr. Max Fischer",
    specialization: "Radiologist",
    rating: 4.5,
    experience: "9 years",
    image: "https://images.unsplash.com/photo-1509871992630-73dfb6f98c99?w=400&h=400&fit=crop&crop=face",
    availability: "Available Tomorrow",
    status: "available",
    location: "ImageScan Clinic, Berlin",
    price: "$85",
    nextSlot: "Tomorrow 1:00 PM",
    bio: "Expert in MRI, CT scans, and diagnostic imaging.",
    education: "MD from Heidelberg University",
    languages: ["German", "English"],
    phone: "(555) 111-1111",
    email: "max.fischer@imagescan.de",
    address: "22 Radiology Ring, Berlin, Germany",
    achievements: [
      "National Radiology Award",
      "AI Imaging Researcher"
    ],
    timeSlots: {
      today: [],
      tomorrow: ["1:00 PM", "3:30 PM"],
      dayAfter: ["11:00 AM", "2:30 PM"]
    }
  },
  {
    id: 15,
    name: "Dr. Natalia Garcia",
    specialization: "Ophthalmologist",
    rating: 4.9,
    experience: "17 years",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop&crop=face",
    availability: "Available Today",
    status: "available",
    location: "Vision Plus, Mexico City",
    price: "$95",
    nextSlot: "Today 6:00 PM",
    bio: "Specialist in LASIK, cataracts, and eye infections.",
    education: "MD from UNAM, Fellowship in Spain",
    languages: ["Spanish", "English"],
    phone: "(555) 919-8888",
    email: "natalia.garcia@visionplus.mx",
    address: "Av. Visionarios 99, Mexico City, Mexico",
    achievements: [
      "Eye Health Award 2022",
      "Developed mobile vision screening tools"
    ],
    timeSlots: {
      today: ["6:00 PM"],
      tomorrow: ["10:00 AM", "12:00 PM"],
      dayAfter: ["11:00 AM", "1:30 PM"]
    }
  }
  
];

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("today");

  const doctor = doctors.find(doc => doc.id === parseInt(id || "0"));

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h1>
          <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Doctors
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "booked":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "unavailable":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const dateLabels = {
    today: "Today",
    tomorrow: "Tomorrow", 
    dayAfter: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Doctors
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto md:mx-0"
                    />
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-3 border-white ${
                      doctor.status === 'available' ? 'bg-green-400' : 
                      doctor.status === 'booked' ? 'bg-orange-400' : 'bg-red-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                    <p className="text-xl text-blue-600 font-semibold mb-3">{doctor.specialization}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">{doctor.experience}</span>
                      </div>
                      <Badge className={`${getStatusColor(doctor.status)} font-medium`}>
                        {doctor.availability}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{doctor.address}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{doctor.phone}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{doctor.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>About Dr. {doctor.name.split(' ')[1]}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                    <p className="text-gray-700 text-sm">{doctor.education}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map(lang => (
                        <Badge key={lang} variant="secondary">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span>Achievements & Awards</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {doctor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 sticky top-4">
              <CardHeader>
                <CardTitle className="text-center text-xl">Book Appointment</CardTitle>
                <div className="text-center">
                  <span className="text-2xl font-bold text-blue-600">{doctor.price}</span>
                  <span className="text-gray-600 ml-2">per consultation</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div>
                  <h4 className="font-semibold mb-3">Select Date</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(dateLabels).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedDate(key)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          selectedDate === key 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{label}</div>
                        <div className="text-sm text-gray-600">
                          {doctor.timeSlots[key as keyof typeof doctor.timeSlots].length} slots available
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h4 className="font-semibold mb-3">Available Times</h4>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {doctor.timeSlots[selectedDate as keyof typeof doctor.timeSlots].map((time, index) => (
                      <button
                        key={index}
                        className="p-2 text-sm border border-gray-200 rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {doctor.timeSlots[selectedDate as keyof typeof doctor.timeSlots].length === 0 && (
                    <p className="text-gray-500 text-center py-4">No slots available for this date</p>
                  )}
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                  onClick={() => navigate(`/book/${doctor.id}`)}
                  disabled={doctor.status === 'unavailable'}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Continue to Book
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorProfile;
