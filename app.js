const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit'); // Limit requests from same API
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

// Start express app
const app = express();
app.enable('trust proxy'); // Trust first proxy for secure cookies
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// implement cors
app.use(cors());
// app.use(
//   cors({
//     origin: 'https://',
//   }),
// );
app.options('*', cors()); // Pre-flight request for all routes

app.use(express.static(path.join(__dirname, 'public')));
// Set seecurity HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['*'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        scriptSrc: [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'https://js.stripe.com/',
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https://tile.openstreetmap.org',
          'https://*.cartocdn.com',
        ],
      },
    },
  }),
);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // maximum 100 request in 1 hour
  message: 'Too many requests from this IP, please try again later in an hour',
});
app.use('/api', limiter);

// Body parser, reading data from body to req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
