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

const Project1 = () => {
  return (
    <GlobalWrapper>
      <Header title="Design and Analysis of a Residential Building" />
      <CoverImage src={Img1} focusX="28%" focusY="70%" />

      <Section>
        <ContentWrapper>
          <h2>Project Overview</h2>

          <p>
            This project involved the structural design and analysis of a
            two-storey residential building with a focus on safety,
            stability, and efficient load distribution.
          </p>

          <p>
            AutoCAD was used to prepare architectural and structural drawings,
            while STAAD Pro was used for structural modeling and analysis.
            Load calculations were performed for dead loads and live loads
            based on standard design assumptions.
          </p>

          <p>
            Structural members were analyzed for bending moments and shear
            forces, and appropriate dimensions were finalized to ensure
            structural stability and economy.
          </p>
        </ContentWrapper>

        <LargeImage src={Img2} />

        <ContentWrapper>
          <h2>Tools and Learning</h2>

          <p>
            This project strengthened practical understanding of structural
            behavior and improved hands-on experience with AutoCAD and
            STAAD Pro.
          </p>

          <p>
            It also highlighted the importance of accuracy in calculations
            and coordination between drawings and structural analysis.
          </p>
        </ContentWrapper>

        <TwoImage src1={Img3} src2={Img4} maxHeight="450px" />
      </Section>

      <Footer />
    </GlobalWrapper>
  )
}

export default Project1
