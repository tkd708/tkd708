import Img from 'gatsby-image';
import _ from 'lodash';
import { lighten } from 'polished';
import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '../styles/colors';

export interface ContentListItemProps {
  icon: any;
  title: string;
  subTitle1: string;
  subtitle2: string;
  subtitle3: string;
  description: string;
}

export const ContentListItem: React.FC<ContentListItemProps> = ({
  icon,
  title,
  subTitle1,
  subTitle2,
  subTitle3,
  description,
}) => {
  return (
    <article css={PostCardStyles}>
      <PostCardContent>
        <PostCardImage>{icon && <Img alt={`${title} cover image`} fixed={icon} />}</PostCardImage>
        <PostCardHeader>
          <PostCardTitle>{title}</PostCardTitle>
          <PostCardSubTitle>{subTitle1}</PostCardSubTitle>
          <PostCardSubSubTitle>{subTitle2}</PostCardSubSubTitle>
          <PostCardSubSubTitle>{subTitle3}</PostCardSubSubTitle>
        </PostCardHeader>
      </PostCardContent>
      <PostCardExcerpt>
        <p>{description}</p>
      </PostCardExcerpt>
    </article>
  );
};

const PostCardStyles = css`
  position: relative;
  flex: 1 1 301px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 0 12px;
  padding: 0 12px 12px;
  min-height: 220px;
  background-size: cover;
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PostCardImage = styled.div`
  width: 150px;
  height: 150px;
  margin-right: 24px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;

  @media (max-width: 960px) {
  }

  @media (max-width: 480px) {
  }

  @media (prefers-color-scheme: dark) {
    background: ${colors.darkmode};
  }
`;

const PostCardTitle = styled.h2`
  margin: 0 0 0.8em;
  line-height: 1em;
  transition: color 0.2s ease-in-out;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const PostCardSubTitle = styled.p`
  margin: 0 0 0.4em;
  line-height: 0.9em;
  transition: color 0.2s ease-in-out;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const PostCardSubSubTitle = styled.p`
  margin: 0 0 0.4em;
  line-height: 0.8em;
  transition: color 0.2s ease-in-out;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const PostCardExcerpt = styled.section`
  font-family: Georgia, serif;

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)} !important;
  }
`;

const PostCardHeader = styled.header`
  margin: 15px 0 0;
`;
