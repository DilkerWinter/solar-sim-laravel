import CustomerSection from '@/Components/Customer/Show/Sections/CustomerSection';
import React from 'react';

export default function Show({ Customer }) {
  return (
    <div>
      <CustomerSection customer={Customer}/>
    </div>
  );
}
