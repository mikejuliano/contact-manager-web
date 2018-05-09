// Contact.js

import React from 'react';

export const Contact = ({contact}) => {
  return (
    <div>
      { ['Name:', contact.first_name, contact.last_name, '|', 'Email', contact.email].join(' ') }
    </div>
  );
};