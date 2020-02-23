import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
}));

export const JWT_CONFIG_KEYS = {
    SECRET : 'jwt.secret',
    PUBLIC : 'jwt.public',
};

export const jwtConfig = registerAs('jwt', () => {
    const replaceRegex = /\\n/gi;
    let secret: string = process.env.JWT_SECRET;
    secret = secret.replace(replaceRegex, '\n');
    return {
        secret,
        public: `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAt055x/2JNFxMuN5DA+da
Awj7hFoTDIK8OgSEentBBb/qPxaThK1dy2QpeF1e7iqLrFwXRQ02HQPsFt2nzGQs
+sRrLgS+CzGTDwwwxp5YsSBQPdf9GnUn/gciKdOEPQ/HRkcY1wEFWRVyF/kk4JQe
4Nor/+JVvS4nptZqWTQwU3v+Fue56djjyeJ/1G5xIHoNqELQcVZlkEO966UuZk+u
z8A9biUvPkE15+gk3n6wXmPVmgGAJJ7MBs7siW24ktoEJZxfPT+EURM7+vpTy5LC
ZBe/nKV1H7B4Hr38FqJgPegO8hrg2aZSMskX56VJPrcEisNsTeqkoV7on++fqSTc
YhV4HzjHQ9+JUelBg7Rg6ADmhxeGvDUgJZvM+DB/1zpE4vxLdxFa88V0Jr52jDG2
Lmn1XbdqkFQWnhh04aOFkuUAAp0ybpRbgV3fs9neL9/PUS/6fs6bpLHl2QcCn9xP
N/0TL+6Lu8xvnv+zJWmSVy58Pzi/bTFH2Y434XQLQOtx5rkoUaNj036RzOvKUFEi
hoqeVgOH72Avr9s6GFkgMTkZQxbRbqkakUTydDSKUuclmDdxETCt58MgTjx3CTvu
cOg58gIxrghTLcqvHVko/jbv/FdGmBqlERLfxT30Yi+0iBE50ajdYAkZghhrf+A1
a7sx3oyGoB6Hq/V0NFUtYU0CAwEAAQ==
-----END PUBLIC KEY-----
`
    }
});
