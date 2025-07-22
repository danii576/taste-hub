import { Component, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Removed unused HttpClientModule import
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-contact-component',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, TranslateModule], // Removed HttpClientModule here (should be in app module if needed)
  templateUrl: './contact-component.html',
  styleUrls: ['./contact-component.css'],
})
export class ContactComponent {
  // <-- Form data model for reservation -->
  formData = {
    name: '',
    email: '',
    message: '',
    people: '',
    date: '',
    meal: '',
    time: '',
  };

  // <-- Number options for people count dropdown -->
  peopleCount: number[] = Array.from({ length: 50 }, (_, i) => i + 1);

  // <-- Minimum date allowed for reservation (today) -->
  today: string = new Date().toISOString().split('T')[0];

  // <-- Messages for form submission feedback -->
  message = '';
  messageType = '';
  showValidationError = false;

  // <-- Controls visibility of scroll buttons -->
  showScrollToTop = false;
  showScrollToDown = true;

  // <-- Detect window scroll to toggle scroll buttons -->
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.showScrollToTop = scrollTop > 50;
   const nearBottom =
    window.innerHeight + scrollTop >= document.body.scrollHeight - 50;
    this.showScrollToDown = !nearBottom;  }

  // <-- Scroll smoothly to top -->
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // <-- Scroll smoothly to bottom -->
  scrollToDown() {
    const target = document.documentElement.scrollHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  // <-- Inject HttpClient for HTTP requests -->
  constructor(private http: HttpClient) {}

  // <-- Handle form submission and post data to Formspree -->
  onSubmit(form: any) {
    if (form.invalid) {
      this.showValidationError = true;

      setTimeout(() => {
        this.showValidationError = false;
      }, 2000);

      return;
    }

    const url = 'https://formspree.io/f/xyzpzbgy';
    const headers = new HttpHeaders({ Accept: 'application/json' });

    this.http.post(url, this.formData, { headers }).subscribe({
      next: () => {
        this.message = '✅ Reservation sent successfully!';
        this.messageType = 'success';

        // Reset form data after successful submission
        this.formData = {
          name: '',
          email: '',
          message: '',
          people: '',
          date: '',
          meal: '',
          time: '',
        };

        setTimeout(() => (this.message = ''), 2000);
      },
      error: () => {
        this.message =
          '❌ Failed to book Reservation. Please fill all fields with correct informations';
        this.messageType = 'error';

        setTimeout(() => (this.message = ''), 2000);
      },
    });
  }

  // <-- Context menu visibility toggle and style for popup menu -->
  menuVisible = false;
  menuStyle = {};

  toggleMenu(event: MouseEvent) {
    this.menuVisible = !this.menuVisible;

    // Show menu at mouse click position
    this.menuStyle = {
      position: 'absolute',
      top: event.clientY + 'px',
      left: event.clientX + 'px',
    };

    // Close menu when clicking outside
    setTimeout(() => {
      window.addEventListener('click', this.closeMenuOutside, { once: true });
    });
  }

  // <-- Close menu callback -->
  closeMenuOutside = () => {
    this.menuVisible = false;
  };

  // <-- Copy phone number to clipboard -->
  copyNumber() {
    navigator.clipboard.writeText('+351 920-420-832');
    this.menuVisible = false;
  }

  // <-- Initiate a phone call -->
  callNumber() {
    window.location.href = 'tel:+351920420832';
    this.menuVisible = false;
  }

  // <-- Open WhatsApp chat with number -->
  whatsappNumber() {
    const number = '+351920420832'.replace(/\D/g, '');
    window.open(`https://wa.me/${number}`, '_blank');
    this.menuVisible = false;
  }
}
