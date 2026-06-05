import CallToAction from "../../components/student/CallToAction"
import Compaines from "../../components/student/Compaines"
import CoursesSection from "../../components/student/CoursesSection"
import Footer from "../../components/student/Footer"
import Hero from "../../components/student/Hero"
import Testimoninals from "../../components/student/Testimoninals"

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero/>
      <Compaines/>
      <CoursesSection/>
      <Testimoninals/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home
