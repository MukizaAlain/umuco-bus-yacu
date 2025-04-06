
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jean Uwimana",
    role: "Regular Traveler",
    content: "I travel weekly between Kigali and Butare for business. Umuco Bus has made my commute reliable and comfortable. The online booking system saves me so much time!",
    rating: 5
  },
  {
    id: 2,
    name: "Marie Mutesi",
    role: "Student",
    content: "As a student, I appreciate the affordable prices and student discounts. The buses are always clean and the staff is friendly. Definitely my preferred way to travel home!",
    rating: 4
  },
  {
    id: 3,
    name: "Patrick Mugabo",
    role: "Family Traveler",
    content: "Traveling with my family is always stress-free with Umuco Bus. The seats are comfortable and the drivers are very professional. We feel safe on every journey.",
    rating: 5
  },
  {
    id: 4,
    name: "Diane Uwase",
    role: "Tourist",
    content: "During my vacation in Rwanda, I used Umuco Bus to visit different cities. The booking process was simple and the bus was on time. It was a great experience!",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Passengers Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from people who have traveled with us
          </p>
        </div>
        
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-rwanda-yellow fill-rwanda-yellow' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 min-h-[100px]">"{testimonial.content}"</p>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 space-x-2">
            <CarouselPrevious className="relative static bg-white border-rwanda-blue text-rwanda-blue hover:bg-blue-50" />
            <CarouselNext className="relative static bg-white border-rwanda-blue text-rwanda-blue hover:bg-blue-50" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
