import { QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { AvatarEventProvider } from '../avatar/AvatarEvents';
import { AuthProvider } from '../../store/AuthStore';
import queryClient from '../../store/queryClient';
import { GOOGLE_CLIENT_ID } from '../../config/env';

/* Product-only styling stays off the public marketing critical path. */
import '../../styles/product-shell.css';
import '../../styles/assessment-product.css';
import '../../styles/results-product.css';
import '../../styles/analytics-product.css';
import '../../styles/settings-product.css';

export function ProductRuntimeProviders({ children }) {
  const product = (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AvatarEventProvider>
          {children}
          <Toaster position="top-right" />
        </AvatarEventProvider>
      </AuthProvider>
    </QueryClientProvider>
  );

  return GOOGLE_CLIENT_ID
    ? <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{product}</GoogleOAuthProvider>
    : product;
}

export default ProductRuntimeProviders;
