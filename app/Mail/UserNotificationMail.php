<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $type;
    public $order;
    public $orderItems;

    /**
     * Create a new message instance.
     */
    public function __construct($data)
    {
        $this->user = $data['user'];
        $this->order = $data['order'];
        $this->orderItems = $data['orderItems'];
        $this->type = $data['type'];
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        switch ($this->type) {
            case 'user_registered':
                $subject = 'Welcome to EcoBite!';
                break;
            case 'order_confirmed':
                $subject = 'Order Confirmation';
                break;
            case 'order_shipped':
                $subject = 'Order Shipped!';
                break;
            default:
                $subject = 'Notification';
        }

        return new Envelope(subject: $subject);
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        switch ($this->type) {
            case 'user_registered':
                $view = 'emails.user_registered';
                break;
            case 'order_confirmed':
                $view = 'emails.order_confirmed';
                break;
            case 'order_shipped':
                $view = 'emails.order_shipped';
                break;
            default:
                $view = 'emails.default';
        }

        return new Content(view: $view);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
