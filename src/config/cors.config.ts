export const corsConfig = {
	origin: ['http://localhost:4200', 'https://overlord-85d44.web.app'],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  	preflightContinue: false,
  	optionsSuccessStatus: 204,
	credentials: true,
  };
