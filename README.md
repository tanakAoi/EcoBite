# EcoBite - README

## Tech Stack

-   **Backend**: Laravel
-   **Frontend**: React (with TypeScript & Vite)
-   **Inertia.js**
-   **Database**: MySQL
-   **Hosting**: Heroku
-   **Styling**: Tailwind CSS

## Development Requirements

To develop EcoBite locally, you need the following:

### Tools:

-   PHP (v8.1 or later)
-   Composer (latest version)
-   MySQL (local or hosted instance)
-   TablePlus or another database client (optional, for managing the database)

### External services:

-   Stripe (payment)
-   AWS (Uploading files)
-   Deepl (Dynamic translation)
-   Mailgun (Sending E-mail)
-   Open Exchange Rate (Currency data API)

### Extensions:

-   Laravel Herd (for managing Laravel projects locally)

## Testing Locally

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:

    ```bash
    composer install
    npm install
    ```

3. Set up the database:

    - Import the provided SQL dump (`database/ecobite.sql`).
    - Alternatively, run migrations and seed the database:
        ```bash
        php artisan migrate --seed
        ```

4. Define environment variables:

    - Copy `.env.example` to `.env`.
    - Update the variables with your local settings (see [Environment Variables](#environment-variables)).

5. Generate the application key:

    - Run the following command to generate a new application key:

        ```bash
          php artisan key:generate
        ```

        Then update `APP_KEY` in `.env`.

6. Start the development servers:

    ```bash
    npm run dev
    ```

7. Access the application:
    - If you use Herd, access `http://ecobite.test` or `http://<your-project-name>.test`
    - Alternatively, run:
        ```bash
           php artisan serve
        ```
        And access `http://localhost:8000`

## External Services

-   **Hosting**:
    -   [Heroku](https://heroku.com): For hosting.
-   **Database**:
    -   MySQL hosted locally or on a cloud provider.

## Environment Variables

You need to define the following environment variables:

### Database

-   `DB_CONNECTION=mysql`
-   `DB_HOST=<your-database-host>`
-   `DB_PORT=3306`
-   `DB_DATABASE=<your-database-name>`
-   `DB_USERNAME=<your-database-username>`
-   `DB_PASSWORD=<your-database-password>`

### Stripe

-   `STRIPE_SECRET_KEY=<your-stripe-secret-key>`
-   `STRIPE_PUBLIC_KEY=<your-stripe-public-key>`
-   `STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>`

### Mailgun

-   `MAIL_MAILER=<your-mail-driver>`
-   `MAILGUN_DOMAIN=<your-mailgun-domain>`
-   `MAILGUN_SECRET=<your-mailgun-secret>`
-   `MAILGUN_ENDPOINT=<your-mailgun-endpoint>`

### AWS

-   `AWS_ACCESS_KEY_ID=<your-aws-access-key-id>`
-   `AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>`
-   `AWS_DEFAULT_REGION=<your-aws-region>`
-   `AWS_BUCKET=<your-aws-bucket-name>`

### Open Exchange Rate

-   `OER_APP_ID=<your-open-exchange-rate-app-id>`

### Deepl

-   `DEEPL_API_KEY=<your-deepl-api-key>`

## Database

-   A SQL dump is provided in `database/dump.sql` for quick setup.
-   Alternatively, run the migrations and seeders to generate sample data.

## Test Users

In the deployed version, you can use the following credentials:

-   **Admin**:
    -   Email: `admin@test.com`
    -   Password: `password`
-   **User**:
    -   Email: `customer@test.com`
    -   Password: `password`

If you wish to receive mail, create your account with your email-address in the application. (Do not forget to save your e-mail address as recipient in Mailgun if you use Free plan.)

## Additional Notes

- You need to manually change the role to 'admin' for the first administrator in the database.