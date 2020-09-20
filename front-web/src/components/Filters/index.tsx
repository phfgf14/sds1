import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  link: string;
  linkText: string;
};

export default function Filters({ link, linkText }: Props) {
  return (
    <div className="filters-container records-actions">
      <Link to={link}>
        <button className="action-filters">{linkText}</button>
      </Link>
    </div>
  );
}
