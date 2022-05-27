import React, { useState } from "react"
import './Slider/Slider.css'
import './Home.css'
import BtnSlider from './Slider/BtnSlider'
import dataSlider from './Slider/dataSliderHome'

export default function Slider() {
  
  const [slideIndex, setSlideIndex] = useState(1)

  const nextSlide = () => {
      if(slideIndex !== dataSlider.length){
          setSlideIndex(slideIndex + 1)
      } 
      else if (slideIndex === dataSlider.length){
          setSlideIndex(1)
      }
  }

  const prevSlide = () => {
      if(slideIndex !== 1){
          setSlideIndex(slideIndex - 1)
      }
      else if (slideIndex === 1){
          setSlideIndex(dataSlider.length)
      }
  }

  const moveDot = index => {
      setSlideIndex(index)
  }

  return (
      <div className="container-slider">
          {dataSlider.map((obj, index) => {
              return (
                  <div
                  key={obj.id}
                  className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                  >
                      <img 
                      src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} 
                      />
                  </div>
              )
          })}
          <BtnSlider moveSlide={nextSlide} direction={"next"} />
          <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

          <div className="container-dots">
              {Array.from({length: 8}).map((item, index) => (
                  <div 
                  onClick={() => moveDot(index + 1)}
                  className={slideIndex === index + 1 ? "dot active" : "dot"}
                  ></div>
              ))}
          </div>
      </div>
  )
     }
  


/* export default Home */
/*
return (
  <>

    
    <h2>Home</h2>
    <div>
    <h1>Taylor Swift</h1>

      <p>Taylor Alison Swift (born December 13, 1989) is an American
        singer-songwriter. Her discography spans multiple genres, and
        her narrative songwriting—often inspired by her personal life—
        has received critical praise and widespread media coverage. Born
        in West Reading, Pennsylvania, Swift moved to Nashville,
        Tennessee, at the age of 14 to pursue a career in country music.
        She signed a songwriting contract with Sony/ATV Music
        Publishing in 2004 and a recording deal with Big Machine
        Records in 2005, and released her eponymous debut studio album
        in 2006.
        </p>

      <p>
        Swift explored country pop on the albums Fearless (2008) and
        Speak Now (2010); the success of the singles "Love Story" and
        "You Belong with Me" on both country and pop radio established
        her as a leading crossover artist. She experimented with rock and
        electronic genres on her fourth studio album, Red (2012),
        supported by the singles "We Are Never Ever Getting Back
        Together" and "I Knew You Were Trouble". Swift eschewed
        country on her synth-pop album 1989 (2014) and its charttopping tracks "Shake It Off", "Blank Space", and "Bad Blood".
        The media scrutiny on Swift's life inspired Reputation (2017),
        which drew from urban sounds. Led by "Look What You Made Me
        Do", the album made Swift the only act in MRC Data history to
        have four albums each sell over a million copies in a week.
        Parting ways with Big Machine, Swift signed with Republic
        Records in 2018 and released her seventh studio album, Lover
        (2019). Inspired by escapism during the COVID-19 pandemic,
        Swift ventured into indie folk and alternative rock styles on her
        2020 studio albums, Folklore and Evermore, receiving plaudits
        for their nuanced storytelling. Following a dispute over the
        masters of her back catalog, she released the 2021 re-recordings
        Fearless (Taylor's Version) and Red (Taylor's Version) to
        universal acclaim. The number-one songs "Cardigan", "Willow"
        and "All Too Well (10 Minute Version)" made Swift the only act to
        simultaneously debut atop the US Billboard Hot 100 and
        Billboard 200 charts three times. Besides music, she has played
        supporting roles in films such as Valentine's Day (2010) and Cats
        (2019), released the autobiographical documentary Miss
        Americana (2020), and directed the musical films Folklore: The
        Long Pond Studio Sessions (2020) and All Too Well: The Short
        Film (2021).
        </p>

      <p>
        Having sold over 200 million records worldwide, Swift is one of
        the best-selling musicians of all time. Eight of her songs have
        topped the Hot 100, and her concert tours are some of the
        highest-grossing in history. She has received 11 Grammy Awards
        (including three Album of the Year wins), an Emmy Award, 34
        American Music Awards (the most for an artist), 29 Billboard
        Music Awards (the most for a woman) and 58 Guinness World
        Records, among other accolades. She has featured on Rolling
        Stone's 100 Greatest Songwriters of All Time (2015), Billboard's
        Greatest of All Time Artists (2019), the Time 100 and Forbes
        Celebrity 100 rankings. Named Woman of the 2010s Decade by
        Billboard and Artist of the 2010s Decade by the American Music
        Awards, Swift has been regarded as a pop icon due to her
        influential career, philanthropy, and advocacy of artists' rights
        and women's empowerment in the music industry
        </p>




      <h2>
        Life and career
        </h2>

      <h3>1989–2003: Early life and education</h3>

      <p>Taylor Alison Swift was born on December 13, 1989, at the
        Reading Hospital in West Reading, Pennsylvania.
        Her father,
        Scott Kingsley Swift, is a former stockbroker for Merrill Lynch;
        her mother, Andrea Gardner Swift (née Finlay), is a former
        homemaker who previously worked as a mutual fund marketing
        executive. Her younger brother, Austin, is an actor. She was
        named after singer-songwriter James Taylor,
        and has Scottish
        and German heritage. Her maternal grandmother, Marjorie
        Finlay, was an opera singer. Swift's paternal great-greatgrandfather was an Italian immigrant entrepreneur and
        community leader who opened several businesses in Philadelphia
        in the 1800s. Swift spent her early years on a Christmas tree
        farm that her father purchased from one of his clients. Swift identifies as a Christian.
        She attended preschool and kindergarten at the Alvernia Montessori School, run by the Bernadine
        Franciscan sisters, before transferring to The Wyndcroft School.
        The family moved to a rented
        house in the suburban town of Wyomissing, Pennsylvania,
        where she attended Wyomissing Area
        Junior/Senior High School.</p>

      <p>At age nine, Swift became interested in musical theater and performed in four Berks Youth Theatre
        Academy productions. She also traveled regularly to New York City for vocal and acting lessons.
        Swift later shifted her focus toward country music, inspired by Shania Twain's songs, which made her
        "want to just run around the block four times and daydream about everything." She spent
        weekends performing at local festivals and events. After watching a documentary about Faith
        Hill, Swift felt sure she needed to move to Nashville, Tennessee, to pursue a career in music. She
        traveled with her mother at age eleven to visit Nashville record labels and submitted demo tapes of
        Dolly Parton and The Chicks karaoke covers. She was rejected, however, because "everyone in that
        town wanted to do what I wanted to do. So, I kept thinking to myself, I need to figure out a way to be
        different."
        </p>

      <p>When Swift was around 12 years old, computer repairman and local musician Ronnie Cremer taught
        her to play guitar. He helped with her first efforts as a songwriter, leading her to write "Lucky
        You".In 2003, Swift and her parents started working with New York-based talent manager Dan
        Dymtrow. With his help, Swift modeled for Abercrombie & Fitch as part of their "Rising Stars"
        campaign, had an original song included on a Maybelline compilation CD, and attended meetings with</p>
    </div>
  </>
)
} */