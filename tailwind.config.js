/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{

      
      "logo_red":"#ed1f22ff",
      "logo_yellow":"#f5b31bff",
      "logo_blue":"#071657ff",
      "logo_green":"#3c9e3eff",
      "logo_white":"#fcfeffff",
      "logo_letter_black":"#212121f",
      "log_letter_gray":"#666666ff",

      
      'blue':'#1363DF',
      'light-blue':'#E7EFFC',
      'letter-dark':'#082A5E',
      'letter-black':'#486288',
      'white':'#ffff',
      'background':'#F2F3F8',
      'line':'#E5E5E5',
      'black':"#0f172a",

      // 'cmsbackground':"#F3F2F7",
      // 'cmswhite':"#FBFBFC",
      // 'cmsviolet':"#AC55DB",
      'cmsbackviolet':"#EFE2F7",
      // 'cmsorange': "#ea580c"
      
    },
    extend: {
      boxShadow: {
        'custom-skyblue': '0px 0px 2px 2px skyblue',
      },
  //     backgroundImage: {
  //       'hero-pattern': "url('https://images.pexels.com/photos/17368157/pexels-photo-17368157/free-photo-of-group-of-people-in-front-of-a-locomotive.jpeg')",
  //       'bglogin': "url('https://img.freepik.com/free-photo/amazing-beautiful-sky-with-clouds-with-bird_58702-5853.jpg?t=st=1708963653~exp=1708967253~hmac=fff0cd5f98c838f9a600da11c0efa80cae7c4cdddd6651542e301c4b0cf1e4e5&w=996')",
  //       'bg_gra_black': "radial-gradient(circle, #000000, #3b3b3b, #777777, #b9b9b9, #ffffff)"
      
      },
    
  // },
  plugins: [],
}

}