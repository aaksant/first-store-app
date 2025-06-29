import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Award, Heart, Truck } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/placeholder.svg?height=120&width=120',
      initials: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: '/placeholder.svg?height=120&width=120',
      initials: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Experience Lead',
      image: '/placeholder.svg?height=120&width=120',
      initials: 'ER'
    },
    {
      name: 'David Kim',
      role: 'Product Manager',
      image: '/placeholder.svg?height=120&width=120',
      initials: 'DK'
    }
  ];

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50K+' },
    { icon: Award, label: 'Years in Business', value: '8+' },
    { icon: Truck, label: 'Orders Delivered', value: '100K+' },
    { icon: Heart, label: 'Customer Rating', value: '4.9/5' }
  ];

  const missions = [
    {
      icon: Award,
      title: 'Quality first',
      description:
        'We carefully vet every product to ensure it meets our high standards for quality, durability, and value.'
    },
    {
      icon: Heart,
      title: 'Customer focused',
      description:
        'Your satisfaction is our priority. We are here to help you find exactly what you need and ensure you love your purchase.'
    },
    {
      icon: Truck,
      title: 'Reliable services',
      description:
        'From fast shipping to easy returns, we make shopping with us convenient and worry-free.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            About Our Store
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Bringing Quality to Your Doorstep
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Since 2016, we have been committed to providing exceptional products
            and outstanding customer service. Our journey started with a simple
            mission: make quality accessible to everyone.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-18 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  What started as a small family business has grown into a
                  trusted destination for quality products. We believe that
                  everyone deserves access to well-made, thoughtfully designed
                  items that enhance their daily lives.
                </p>
                <p>
                  Our commitment to excellence extends beyond our products to
                  every aspect of your shopping experience. From our carefully
                  curated selection to our dedicated customer support team, we
                  are here to serve you.
                </p>
                <p>
                  Today, we are proud to serve customers across the country, but
                  we have not forgotten our roots. Every order is handled with
                  the same care and attention we gave to our very first
                  customer.
                </p>
              </div>
            </div>
            <div className="hidden relative h-full md:block">
              <Image
                src="/table.jpg"
                alt="Our store"
                fill
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are driven by core values that guide everything we do, from
              product selection to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 inline-flex items-center justify-center mb-4">
                    <mission.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{mission.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{mission.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Behind every great shopping experience is a dedicated team of
              people who care about what they do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                    />
                    <AvatarFallback className="text-lg">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
