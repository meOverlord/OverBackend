import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
}));

export const JWT_CONFIG_KEYS = {
    SECRET : 'jwt.secret',
    PUBLIC : 'jwt.public',
};

export const jwtConfig = registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET,
    public: '-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAt055x/2JNFxMuN5DA+da\nAwj7hFoTDIK8OgSEentBBb/qPxaThK1dy2QpeF1e7iqLrFwXRQ02HQPsFt2nzGQs\n+sRrLgS+CzGTDwwwxp5YsSBQPdf9GnUn/gciKdOEPQ/HRkcY1wEFWRVyF/kk4JQe\n4Nor/+JVvS4nptZqWTQwU3v+Fue56djjyeJ/1G5xIHoNqELQcVZlkEO966UuZk+u\nz8A9biUvPkE15+gk3n6wXmPVmgGAJJ7MBs7siW24ktoEJZxfPT+EURM7+vpTy5LC\nZBe/nKV1H7B4Hr38FqJgPegO8hrg2aZSMskX56VJPrcEisNsTeqkoV7on++fqSTc\nYhV4HzjHQ9+JUelBg7Rg6ADmhxeGvDUgJZvM+DB/1zpE4vxLdxFa88V0Jr52jDG2\nLmn1XbdqkFQWnhh04aOFkuUAAp0ybpRbgV3fs9neL9/PUS/6fs6bpLHl2QcCn9xP\nN/0TL+6Lu8xvnv+zJWmSVy58Pzi/bTFH2Y434XQLQOtx5rkoUaNj036RzOvKUFEi\nhoqeVgOH72Avr9s6GFkgMTkZQxbRbqkakUTydDSKUuclmDdxETCt58MgTjx3CTvu\ncOg58gIxrghTLcqvHVko/jbv/FdGmBqlERLfxT30Yi+0iBE50ajdYAkZghhrf+A1\na7sx3oyGoB6Hq/V0NFUtYU0CAwEAAQ==\n-----END PUBLIC KEY-----\n'
}));
