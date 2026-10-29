export function privacyView(){return `<article class="privacy-page"><h1 id="privacy-heading" tabindex="-1">Privacy &amp; AI Use in this Demonstrator</h1>
<p class="privacy-intro">This page explains how JAW uses your information, where AI supports the application process, which decisions remain yours, and the limits of this course demonstrator.</p>
<h2>How JAW uses your information</h2>
<p>JAW uses the information and evidence you provide to support your job-application workflow. This can include building your Profile, reconciling conflicting evidence, understanding vacancies, comparing vacancy requirements with your evidence, and preparing application material.</p>
<p>Where information has already been verified, JAW is designed to reuse it rather than silently infer it again.</p>
<p>Application material generated with AI does not become authoritative evidence about you simply because it has been generated.</p>
<h2>Where AI assists</h2>
<p>AI can support parts of the wider JAW workflow, for example by interpreting vacancy content, comparing vacancy requirements with applicant evidence, identifying direct, transferable or unsupported alignment, and drafting application material.</p>
<p>Where important information is uncertain or unsupported, JAW is designed to keep that uncertainty visible rather than silently turn it into a fact.</p>
<p><strong>In this demonstrator build, application documents are generated from packaged fixture content and saved workflow state. The inspected application runtime does not call an external AI service to generate them.</strong></p>
<h2>What AI does not decide</h2>
<p>AI does not replace your decision authority.</p>
<p>JAW does not use AI to make the final decision about whether you should pursue a vacancy, approve an application, or submit it.</p>
<h2>What remains under your control</h2>
<p>You decide whether to pursue or not pursue a vacancy.</p>
<p>You review and approve application content before it is treated as ready to submit.</p>
<p>Application submission remains manual in this demonstrator. JAW does not automatically submit applications for you.</p>
<h2>Supporting automation and services</h2>
<p>Some activities in the wider JAW demonstration may be supported by external automation or services.</p>
<p>These are supporting components. They do not become the decision-maker for your application or replace your approval of consequential actions.</p>
<p>The separately demonstrated sourcing agent is not an active applicant-data integration within this application runtime.</p>
<h2>About this demonstrator</h2>
<p>JAW is a course and MVP demonstrator, not a completed production deployment.</p>
<p>In this build, the demonstrated JAW workspace is saved in this browser. When you select an accepted evidence file, the demonstrator reads it to recognise the source using a file hash and records associated source information. It does not save the selected file's binary contents as part of the application workspace.</p>
<p>This description concerns the inspected application behaviour. It is not a guarantee about browser memory erasure, hosting-provider processing or other services outside this runtime.</p>
<p>The demonstrator does not establish completed production implementation for areas such as production authentication, production access controls, operational retention and deletion controls, production hosting, or complete privacy and security operations.</p>
<p>Those responsibilities would require separate production design, implementation and verification.</p>
<h2>Reset demo is not data deletion</h2>
<p><code>Reset demo</code> resets the saved JAW workspace in this browser to its initial demonstrator state. Current demo progress and associated imported-source records are replaced by the initial workspace.</p>
<p>It does not delete your original files, downloaded documents or all other browser-held information.</p>
<p>It should not be understood as a privacy or data-deletion request, and it does not represent the exercise of a data-protection right.</p>
</article>`;}
