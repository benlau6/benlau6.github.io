---
title: Convolution
publishDate: 2024-09-20
---

# Convolution

1D convolution is mainly used in signal processing and time series analysis. It is a mathematical operation that takes two inputs, a signal and a kernel, and produces an output signal. The kernel is a small array of numbers that slides over the input signal, multiplying its values with the kernel values and summing the results. The kernel is also called a filter or a mask.

2D convolution is used in image processing while 3D convolution is used in video processing.

## One-liners

- Convolution is just sliding dot product.
- Convolution contains a input signal and a kernel, which would produce a result whose length is shorter than the input signal, which is usually a problem that we need to fix.
- The length of the result of convolution is `n + m - 1`, where `n` is the length of the input signal and `m` is the length of the kernel.
- The problem of shorten length of result relative to input signal could be fixed by zero padding the input signal at both ends. However, zero padding might produce a result that is longer than the input signal, which we should cut off the extra part.
- Note that zero padding at convolution is different from zero padding at Fourier transform. They have completely different motivations, mechanisms and goals.
- Kernel flipping is needed in time domain convolution, but not in frequency domain convolution. This is due to the perspective of the convolution operation. We look backward in time when we do convolution in time domain so the kernel needs to be flipped.
- The convolution theorem tells us that convolution in the time domain is multiplication in the frequency domain. Doing the convolution in frequency domain is much faster even more steps are involved because FFT and IFFT are really fast, while there are loop of dot products when working with convolution in time domain. Note that there is convolution in frequency domain, which is a completely different thing. [Convolution as spectral multiplication](https://www.youtube.com/watch?v=hj7j4Q8T3Ck)

## Recommended Readings

- [Convolution in one dimension for neural networks](https://e2eml.school/convolution_one_d.html)
- [Convolution in the time domain](https://www.youtube.com/watch?v=9Hk-RAIzOaw)
- [Convolutional Neural Networks Explained (CNN Visualized)](https://www.youtube.com/watch?v=pj9-rr1wDhM)
- [Convolutions | Why X+Y in probability is a beautiful mess](https://www.youtube.com/watch?v=IaSGqQa5O-M)
- [But what is a convolution?](https://www.youtube.com/watch?v=KuXjwB4LzSA)
