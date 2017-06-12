const int   = (min, max) => Math.round(float(min, max));
const float = (min, max) => (min + Math.random() * (max - min));

const arrayElement = a => a[int(0, a.length - 1)];

export default {
    int,
    float,
    arrayElement
};
