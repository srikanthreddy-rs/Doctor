
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, Calendar, Clock, Heart, Phone, Mail, User, Award, Languages, DollarSign, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import { doctors, Doctor } from "@/data/doctors";
import { FloatingMessageButton } from "@/components/FloatingMessageButton";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [selectedMessageDoctor, setSelectedMessageDoctor] = useState<Doctor | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get unique specializations
  const specializations = useMemo(() => {
    const specs = [...new Set(doctors.map(doctor => doctor.specialization))];
    return specs.sort();
  }, []);

  // Filter doctors based on search and specialization
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = selectedSpecialization === "all" || doctor.specialization === selectedSpecialization;
      
      return matchesSearch && matchesSpecialization;
    });
  }, [searchTerm, selectedSpecialization]);

  const handleSendMessage = (doctor: Doctor) => {
    setSelectedMessageDoctor(doctor);
  };


  const getStatusBadge = (status: string, availability: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Available Today</Badge>;
      case 'booked':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Fully Booked</Badge>;
      case 'unavailable':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">On Leave</Badge>;
      default:
        return <Badge variant="secondary">{availability}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : index < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
            <p className="text-gray-600">Book appointments with qualified healthcare professionals</p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search doctors, specializations, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md bg-white min-w-[200px]"
              >
                <option value="all">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {doctor.name}
                      </CardTitle>
                      <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(doctor.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                          ({doctor.rating})
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(doctor.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(doctor.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Status and Availability */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(doctor.status, doctor.availability)}
                  <div className="text-right">
                    <div className="font-semibold text-blue-600 text-lg">{doctor.price}</div>
                    <div className="text-sm text-gray-600">Consultation</div>
                  </div>
                </div>

                {/* Experience and Next Slot */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">{doctor.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600">{doctor.nextSlot}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{doctor.location}</span>
                </div>

                {/* Languages */}
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">
                    {doctor.languages.join(', ')}
                  </span>
                </div>

                {/* Education */}
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  <strong>Education:</strong> {doctor.education}
                </div>

                {/* Bio */}
                <div className="text-sm text-gray-600 line-clamp-3">
                  {doctor.bio}
                </div>

                {/* Key Procedures */}
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Key Procedures:</div>
                  <div className="flex flex-wrap gap-1">
                    {doctor.procedures.slice(0, 3).map((procedure, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {procedure}
                      </Badge>
                    ))}
                    {doctor.procedures.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{doctor.procedures.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Insurance */}
                <div className="text-xs text-gray-500">
                  <strong>Insurance:</strong> {doctor.insurance.slice(0, 2).join(', ')}
                  {doctor.insurance.length > 2 && ` +${doctor.insurance.length - 2} more`}
                </div>

                {/* Contact Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3" />
                    <span>{doctor.phoneNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-3 w-3" />
                    <span className="truncate max-w-[120px]">{doctor.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => navigate(`/doctor/${doctor.id}`)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800"
                  >
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSendMessage(doctor)}
                    className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all doctors.
            </p>
          </div>
        )}
      </main>

      {/* Floating Message Button for selected doctor */}
      {selectedMessageDoctor && (
        <FloatingMessageButton
          doctorId={selectedMessageDoctor.id}
          doctorName={selectedMessageDoctor.name}
        />
      )}
    </div>
  );
};

export default Index;
