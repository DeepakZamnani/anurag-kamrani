import React from 'react'
import styled from 'styled-components'
import media from 'utils/media-queries'

import GlobalWrapper from 'components/global-wrapper'
import Header from 'components/article/header'
import CoverImage from 'components/article/coverimage'
import ContentWrapper from 'components/article/contentwrapper'
import Footer from 'components/footer'
import TwoImage from 'components/article/twoimage'
import LargeImage from 'components/article/largeimage'

import Img1 from 'img/articles/project1/img1.jpg'
import Img2 from 'img/articles/project1/img2.jpg'
import Img3 from 'img/articles/project1/img3.jpg'
import Img4 from 'img/articles/project1/img4.jpg'

const Section = styled.section`
  margin: 64px 0;
  ${media.sm`
    margin: 0;
  `}
`

const Project2 = () => {
  return (
    <GlobalWrapper>
      <Header title="Sustainable Building Materials for Low-Cost Housing" />
      <CoverImage src={Img1} focusX="28%" focusY="70%" />

      <Section>
        <ContentWrapper>
          <h2>Project Overview</h2>

          <p>
            This ongoing research project focuses on identifying sustainable
            and eco-friendly building materials suitable for low-cost housing
            construction.
          </p>

          <p>
            The objective is to reduce construction costs while minimizing
            environmental impact by studying alternative materials, recycled
            components, and locally available resources.
          </p>

          <p>
            Factors such as durability, availability, cost efficiency, and
            ease of construction are considered while evaluating material
            performance.
          </p>
        </ContentWrapper>

        <LargeImage src={Img2} />

        <ContentWrapper>
          <h2>Research Focus</h2>

          <p>
            The project emphasizes sustainable construction practices and
            explores how material selection can contribute to affordable and
            environmentally responsible housing.
          </p>

          <p>
            This research has helped develop a deeper understanding of green
            construction methods and their future relevance in civil
            engineering.
          </p>
        </ContentWrapper>

        <TwoImage src1={Img3} src2={Img4} maxHeight="450px" />
      </Section>

      <Footer />
    </GlobalWrapper>
  )
}

export default Project2
