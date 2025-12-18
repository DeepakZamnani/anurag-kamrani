import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import media from 'utils/media-queries'

import { color, fontSize } from 'styles/theme'

import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'

const Big = styled.span`
  font-size: ${fontSize.f6};
  color: ${color.grey900};
  font-weight: 700;
  letter-spacing: -0.4px;
  line-height: 1.35;
  ${media.lg`
    font-size: ${fontSize.f5};
    letter-spacing: -0.3px;
  `}
  ${media.sm`
    font-size: ${fontSize.f5};
  `}
`

const About = () => {
  return (
    <TwoColumns
      leftColumn={<SectionHeading>About</SectionHeading>}
      rightColumn={
        <Fragment>
          <Big>Hi, I’m Anurag — a final-year civil engineering student interested in structural design, sustainable materials, and modern construction practices. I enjoy applying my learning to real-world construction and infrastructure projects.</Big>
          {/* <p>Currently I'm designing for Acme.</p> */}
          <p style={{ marginBottom: 0 }}>
            Outside of work I'm passionate about sports.
          </p>
        </Fragment>
      }
    />
  )
}

export default About
