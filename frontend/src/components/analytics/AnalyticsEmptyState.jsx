import React from 'react';
import EmptyState from '../ui/EmptyState';

export default function AnalyticsEmptyState({ title, description, action }) {
  return <EmptyState title={title} description={description} action={action} />;
}
