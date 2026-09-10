"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useShopifyCookies } from "@shopify/hydrogen-react";
import {
  GA_ID,
  FB_PIXEL_ID,
  CLARITY_ID,
  CROSS_DOMAINS,
  providers,
  hasTrackingConsent,
  analyticsCookieDomain,
  trackPageView,
} from "@/lib/analytics";

/**
 * يحمّل سكربتات GA4 / Meta Pixel / Clarity (كل واحد لو الـ ID بتاعه موجود)،
 * يدير كوكيز تتبّع Shopify، ويبعت page_view عند كل تغيّر في المسار.
 *
 * لازم يتلفّ بـ <Suspense> لإنه يستخدم useSearchParams.
 */
export default function Analytics() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useShopifyCookies({
    hasUserConsent: hasTrackingConsent(),
    domain: analyticsCookieDomain(),
  });

  useEffect(() => {
    // نأجّل شوية عشان document.title يتحدّث بعد الانتقال
    const id = window.setTimeout(() => trackPageView(), 80);
    return () => window.clearTimeout(id);
  }, [pathname, search]);

  return (
    <>
      {providers.ga4 && (
        <>
          <Script
            id="ga4-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                send_page_view: false,
                linker: { domains: ${JSON.stringify(CROSS_DOMAINS)}, accept_incoming: true }
              });
            `}
          </Script>
        </>
      )}

      {providers.meta && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `}
        </Script>
      )}

      {providers.clarity && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}
