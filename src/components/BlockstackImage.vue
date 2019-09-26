<template>
  <v-img
    lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWQAAADICAMAAADobGszAAAAjVBMVEXUzs5GGVtzU39dN25UKmaOdZWXgZ2una5IHF1ZMWrKwcXQycuEao5lQXRWLWjRystwTn1pRXfGvMK/tL1RJ2RPJGKHbJCDZ4zTzM3NxchiPnJLH1/CuL+7rrm1prW4q7ermq2ij6abhqCVf5uAY4prSXlgOnCwobF4WIOgi6OSepiolqqJb5B9X4dtS3tEj5O+AAADmUlEQVR42uzQsREAEBQFsP/cobb/so7OBopkhBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8J+VtLpGkuKYSbrkl+TNrr3uqAmEARj+3g5ahHJYBKvg+bja1fu/vHZXZ8AgjZvUNCvz/JMwbPJGB2bYL8hGvuHrRLZs5L+xkb+gpsiTt9xxM7WeXx/tbBy3COPuSKqiRRy6TrDy/hp5+CvuuWnQ8a6G7s9DR/LEbkf2jmjBxERa5GjZXkr9XB+d377x/QBHxvqsdCfGZKsPzp/4R3AzcqIoZVM5m1J1KBs7aO6uMXISohV90zitDG1X5GEApKu+nyy2QJaYyPFy5kXebu0Cur2vgN4+8cfdFGfbFDkgPfR9b54DGz20B6jFn6HLEGfbqsgrQHnyLnoFYvkwOyZyMc3gRc4OwMaXd56Chsiw9c5hA6AvHzpAfBmaQ5siRyEUY/M9NU2qFuZo5EA60jOH2xg501ecmrnGT8HRQ5OiVZHnwEC0X+ZT1dCBpTl7JdrPxsjlNUJ4NZdeijZoVeQ3YCJalEIgNd9gbc5ORJs2Rp6JFkNgsnqizVoVeQPZUKpNXPPRWMNJ3p2gJ0bkNkR2I9GOoPQfuhrapshbyMWoft+G08EmzLgI5J2CWEqqIXIqxk/o3RzapsghbKTUMfe4WUCVKmfYUtAQ2alFrg+1kUV2BTbyg6eLkQO8dKfJKDrPyeoz04Vjp4srJ8ikfuPbX62lX0Hdf+OrR67f+IZFmyI3PMIdIRyKpkDd/QhXj9z6R7iGxUhcnar7gLp7MVKP3PrFyNWyOjLL6m+VH/cwNpEjp7I2HrufieynELZ0WS0rYFvbIOoA+0v5NSayHICT2SC6N7K55Lfz0FHQrg2iy1Znd+wni7zc6uwDHKeeP14qipOJ7CtAfWx1Ojjb+yK3b6vzilvbtN+ZSbO0WINq2LS/P7JMMjT3+3Nv2tcii/d66/WTqZz9kkpk6efl8c9Flokq31zlcJSnVI9sXqSmbqaOc6mYrVXhhi9dT3Rk8yLV0S9SPxdZ/P1JD+3BQKyHGgFLsR5qD8zEeqSRgnAo1j+3OPi6cQx0xPr3lqSDXRJ5s4MD9J7634j+myUVqZ2RH2L0VqC99MV6DG8Vh4Xr5D92YlmWZVmWZVmWZf1mDw4EAAAAAID8XxtBVVVVVVVVVVVVVVVVVVVpDw4EAAAAAAT5W4+wQAUAAAAAAAAAAADwApRfN4IlHal2AAAAAElFTkSuQmCC"
    :src="link"
    cover
  ></v-img>
</template>

<script>
import { UserSession } from 'blockstack'

export default {
  props: {
    url: { type: String, required: true }
  },
  data () {
    return {
      link: '',
      userSession: new UserSession()
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    getImage () {
      this.userSession.getFile(this.url).then(dataUrl => {
        this.link = dataUrl
      })
    }
  }
}
</script>

<style scoped></style>