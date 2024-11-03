import { InstagramIcon } from 'lucide-react'
import { useState } from 'react'
import StepsIndicator from '../extra/StepsIndicator';
import SignUpForm from './SignUp/SignUpForm';


const SignUp = ({setIsLoggingIn} : {setIsLoggingIn : any}) => {

  const [currentStep,setCurrentStep] = useState(1);

  function handleCurrentStep()  {
    setCurrentStep(prev => {
      prev < 4 && prev++;
      
      return prev;
    })
  }

  function handleLastStep() {
    setCurrentStep(prev => {
      prev > 0 && prev--;
      return prev;
    })
  }
  

  return (
    <div className='w-full max-h-screen px-5'>

      <div className='mt-5 ml-2'>
        <InstagramIcon width={"30px"} height={"30px"} color='black'/>
      </div>

      <div className='w-full h-[600px]'>

        <div className='mt-20 w-full text-center'>
            <h1 className='text-[30px] font-semibold text-black/80'>Create an account</h1>
            <p className='text-[12px] font-medium text-black/70'>Already have an account ? <span onClick={() => setIsLoggingIn((prev : any) => !prev)} className='underline cursor-pointer'>Sign In</span></p>
        </div>

 
        <div className='mt-10'>
          <StepsIndicator  currentStep={currentStep}/>
        </div>

        <SignUpForm setIsLoggingIn={setIsLoggingIn} handleLastStep={handleLastStep}  currentStep={currentStep} handleCurrentStep={handleCurrentStep}/>
        

      </div>
      
    </div>
  )
}

export default SignUp
