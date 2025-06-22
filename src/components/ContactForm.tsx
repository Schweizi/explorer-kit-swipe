
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ContactFormProps {
  selectedProducts: Array<{ name: string; category: string }>;
}

const ContactForm = ({ selectedProducts }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newsletter: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productList = selectedProducts
      .map(product => `- ${product.name} (${product.category})`)
      .join('\n');
    
    const subject = encodeURIComponent('Essential Explorer Kit - Interesse');
    const body = encodeURIComponent(
      `Hallo Transa Team,

ich habe mein persönliches Essential Explorer Kit zusammengestellt und möchte informiert werden, sobald das Bundle verfügbar ist.

Meine Auswahl:
${productList}

Kontaktdaten:
Vorname: ${formData.firstName}
Name: ${formData.lastName}
E-Mail: ${formData.email}
Newsletter: ${formData.newsletter ? 'Ja, ich möchte den Newsletter erhalten' : 'Nein'}

Nachricht: Wir informieren dich wenn das Bundle ready ist damit du als erste es vergünstigt im Laden holen kannst.

Beste Grüße`
    );
    
    window.location.href = `mailto:info@transa.ch?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-inter font-semibold text-transa-cream mb-2">
          Bleib informiert!
        </h3>
        <p className="text-transa-cream/70 font-inter text-sm">
          Wir informieren dich wenn das Bundle ready ist, damit du als erste es vergünstigt im Laden holen kannst.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-transa-cream font-inter">
            Vorname *
          </Label>
          <Input
            id="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className="bg-transa-cream text-transa-dark border-0 font-inter"
            placeholder="Max"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-transa-cream font-inter">
            Name *
          </Label>
          <Input
            id="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className="bg-transa-cream text-transa-dark border-0 font-inter"
            placeholder="Mustermann"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-transa-cream font-inter">
          E-Mail *
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="bg-transa-cream text-transa-dark border-0 font-inter"
          placeholder="max@beispiel.ch"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          checked={formData.newsletter}
          onCheckedChange={(checked) => 
            setFormData(prev => ({ ...prev, newsletter: checked as boolean }))
          }
          className="border-transa-cream data-[state=checked]:bg-transa-turquoise data-[state=checked]:border-transa-turquoise"
        />
        <Label htmlFor="newsletter" className="text-transa-cream/90 font-inter text-sm cursor-pointer">
          Ja, ich möchte den Newsletter erhalten und über neue Produkte informiert werden
        </Label>
      </div>

      <Button 
        type="submit"
        className="w-full bg-transa-turquoise hover:bg-transa-turquoise/90 text-white font-inter font-semibold py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 mt-6"
      >
        Interesse bekunden
      </Button>
    </form>
  );
};

export default ContactForm;
