import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Research() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    agentTypes: [],
    agentTypesOther: '',
    barriers: [],
    barriersOther: '',
    auditImportance: 5,
    valuableOutcomes: [],
    technicalConstraints: [],
    blocked: '',
    viabilityFactors: [],
    trustEvidence: [],
    additionalNeeds: '',
    adoption: '',
    wantsEarlyAccess: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    document.title = 'Research Survey — Synaptik Core';
    const description = 'Share your AI agent needs and challenges in our research survey to help shape Synaptik Core.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  // Auto-redirect timer after submission
  useEffect(() => {
    if (!submitted) return;
    
    if (countdown === 0) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [submitted, countdown, navigate]);

  const handleCheckbox = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send to Formspree - replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xldpnjzd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentTypes: formData.agentTypes.join(', '),
          agentTypesOther: formData.agentTypesOther,
          barriers: formData.barriers.join(', '),
          barriersOther: formData.barriersOther,
          auditImportance: formData.auditImportance,
          valuableOutcomes: formData.valuableOutcomes.join(', '),
          technicalConstraints: formData.technicalConstraints.join(', '),
          blocked: formData.blocked,
          viabilityFactors: formData.viabilityFactors.join(', '),
          trustEvidence: formData.trustEvidence.join(', '),
          additionalNeeds: formData.additionalNeeds,
          adoption: formData.adoption,
          email: formData.email,
        }),
      });

      if (response.ok) {
        console.log('Survey submitted successfully!');
        setSubmitted(true);
      } else {
        console.error('Form submission failed');
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  if (submitted) {
    return (
      <main className="relative bg-white text-neutral-900 min-h-screen flex flex-col">
        <div className="relative flex flex-col items-center justify-center flex-1 px-4">
          <div className="max-w-xl w-full rounded-xl bg-white border-2 border-indigo-600 shadow-2xl p-8 text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-indigo-600">Thank You!</h2>
            <p className="text-lg text-neutral-900 mb-6">
              Your feedback will help shape the future of Synaptik Core.
            </p>
            <p className="text-sm text-neutral-600 mb-4">
              Redirecting to home in <span className="font-bold text-indigo-600">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
            </p>
            <button
              onClick={() => navigate('/')}
              className="rounded-full bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-500 transition-colors"
            >
              Back to Home Now
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white text-neutral-900 min-h-screen flex flex-col"
    >
      <div className="relative mx-auto w-full max-w-4xl px-4 py-10 md:py-16">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </button>

        <div className="rounded-xl bg-white border-2 border-indigo-600 shadow-2xl p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Synaptik Core Research Survey
          </h1>
          <p className="text-neutral-900 opacity-90 mb-8">
            Help us understand your AI agent needs and challenges. Your insights will directly shape our research roadmap.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Q1: Agent Types */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                1. What type of AI agents are you currently building or planning to build?
              </label>
              <div className="space-y-2">
                {[
                  'Research/scientific agents',
                  'Financial/fintech agents',
                  'Healthcare/medical agents',
                  'Legal/compliance agents',
                  'General-purpose agents',
                  'Not currently building agents',
                  'Other',
                ].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agentTypes.includes(option)}
                      onChange={() => handleCheckbox('agentTypes', option)}
                      className="w-4 h-4 rounded border-neutral-400"
                    />
                    <span className="text-neutral-900">{option}</span>
                  </label>
                ))}
                {formData.agentTypes.includes('Other') && (
                  <input
                    type="text"
                    value={formData.agentTypesOther}
                    onChange={(e) => setFormData({ ...formData, agentTypesOther: e.target.value })}
                    placeholder="Please specify..."
                    className="ml-6 mt-2 w-full max-w-md rounded-lg border border-neutral-300 bg-white/50 backdrop-blur-sm p-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
            </div>

            {/* Q2: Barriers */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                2. What is your biggest barrier to deploying AI agents in production?
              </label>
              <div className="space-y-2">
                {[
                  'Lack of audit trails',
                  'Performance overhead',
                  'Integration complexity',
                  'Legal/compliance uncertainty',
                  'Cost',
                  'Team expertise',
                  'Other (please specify)',
                ].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.barriers.includes(option)}
                      onChange={() => handleCheckbox('barriers', option)}
                      className="w-4 h-4 rounded border-neutral-400"
                    />
                    <span className="text-neutral-900">{option}</span>
                  </label>
                ))}
                {formData.barriers.includes('Other (please specify)') && (
                  <input
                    type="text"
                    value={formData.barriersOther}
                    onChange={(e) => setFormData({ ...formData, barriersOther: e.target.value })}
                    placeholder="Please specify..."
                    className="ml-6 mt-2 w-full max-w-md rounded-lg border border-neutral-300 bg-white/50 backdrop-blur-sm p-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
            </div>

            {/* Q3: Audit Importance (1-10 scale) */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                3. How important is verifiable audit trail capability for your AI agents?
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-700">Not important</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.auditImportance}
                  onChange={(e) =>
                    setFormData({ ...formData, auditImportance: parseInt(e.target.value) })
                  }
                  className="flex-1 h-2 bg-neutral-300 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-neutral-700">Critical</span>
              </div>
              <p className="mt-2 text-center text-2xl font-bold text-indigo-600">
                {formData.auditImportance}
              </p>
            </div>

            {/* Q4: Valuable Outcomes */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                4. Which outcomes would be most valuable for your AI agents?
              </label>
              <div className="space-y-2">
                {[
                  'Verifiable memory with cryptographic guarantees',
                  'Pre-action governance enforcement',
                  'Compliance-grade audit trails',
                  'Reproducible decision histories',
                  'Safe testing environments (branching/rollback)',
                ].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.valuableOutcomes.includes(option)}
                      onChange={() => handleCheckbox('valuableOutcomes', option)}
                      className="w-4 h-4 rounded border-neutral-400"
                    />
                    <span className="text-neutral-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q5: Technical Constraints */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                5. What are your technical constraints for agent infrastructure?
              </label>
              <div className="space-y-2">
                {[
                  'Must have <5ms performance overhead',
                  'Must integrate with existing frameworks (LangChain, AutoGPT, etc.)',
                  'Must be open-source',
                  'Must support on-premise deployment',
                  'Must provide export-ready audit reports',
                ].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.technicalConstraints.includes(option)}
                      onChange={() => handleCheckbox('technicalConstraints', option)}
                      className="w-4 h-4 rounded border-neutral-400"
                    />
                    <span className="text-neutral-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q6: Blocked by compliance */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                6. Have legal, compliance, or safety concerns blocked your AI agent projects?
              </label>
              <div className="space-y-2">
                {[
                  'Yes, multiple times',
                  'Yes, at least once',
                  "Not yet, but I'm concerned about it",
                  'No',
                ].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="blocked"
                      checked={formData.blocked === option}
                      onChange={() => setFormData({ ...formData, blocked: option })}
                      className="w-4 h-4"
                    />
                    <span className="text-neutral-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q7: Viability Factors */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                7. If blocked, what would have made the project viable?
              </label>
              <div className="space-y-2">
                {[
                  'Better audit tooling',
                  'Governance enforcement',
                  'Legal precedent or guidance',
                  'Clearer regulations',
                  'Lower implementation cost',
                  'Not applicable',
                ].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.viabilityFactors.includes(option)}
                      onChange={() => handleCheckbox('viabilityFactors', option)}
                      className="w-4 h-4 rounded border-neutral-400"
                    />
                    <span className="text-neutral-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q8: Trust Evidence */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                8. Which evidence would most increase your trust in a cognitive runtime toolchain?
              </label>
              <div className="space-y-2">
                {[
                  'Open-source codebase',
                  'Third-party security audit',
                  'Peer-reviewed publications',
                  'Case studies from similar organizations',
                  'Performance benchmarks',
                  'Free trial or pilot period',
                ].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.trustEvidence.includes(option)}
                      onChange={() => handleCheckbox('trustEvidence', option)}
                      className="w-4 h-4 rounded border-neutral-400"
                    />
                    <span className="text-neutral-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q9: Additional Needs (open-ended) */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                9. What else would you need to trust this type of toolchain?
              </label>
              <textarea
                value={formData.additionalNeeds}
                onChange={(e) => setFormData({ ...formData, additionalNeeds: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 bg-white/50 backdrop-blur-sm p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                placeholder="Your thoughts..."
              ></textarea>
            </div>

            {/* Q10: Early Adopter Interest */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                10. If Synaptik Core were available today at no cost (Phase I research program), would you be interested in being an early adopter?
              </label>
              <div className="space-y-2">
                {[
                  'Yes, immediately',
                  'Maybe, after seeing documentation',
                  'No, but interested in following development',
                  'Not interested',
                ].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="adoption"
                      checked={formData.adoption === option}
                      onChange={() => setFormData({ ...formData, adoption: option })}
                      className="w-4 h-4"
                    />
                    <span className="text-neutral-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q11: Early Access - Yes/No with conditional email */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                11. Would you like early access to the Phase I research program and case studies?
              </label>
              <div className="space-y-2 mb-4">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="wantsEarlyAccess"
                      checked={formData.wantsEarlyAccess === option}
                      onChange={() => setFormData({ ...formData, wantsEarlyAccess: option, email: option === 'No' ? '' : formData.email })}
                      className="w-4 h-4"
                    />
                    <span className="text-neutral-900">{option}</span>
                  </label>
                ))}
              </div>
              
              {formData.wantsEarlyAccess === 'Yes' && (
                <div className="ml-6 mt-3">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Please provide your email address:
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 bg-white/50 backdrop-blur-sm p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-indigo-600 px-8 py-3 text-lg font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Submit Survey
            </button>
          </form>
        </div>
      </div>
    </motion.main>
  );
}
