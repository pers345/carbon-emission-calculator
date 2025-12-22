"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    question: "What is a carbon footprint?",
    answer:
      "A carbon footprint is the total amount of greenhouse gas emissions (primarily carbon dioxide) caused by an individual, organization, event, or product. It's measured in tons of CO₂ equivalent per year and includes emissions from energy use, transportation, food consumption, and other activities.",
  },
  {
    question: "How accurate is this carbon calculator?",
    answer:
      "Our calculator uses industry-standard emission factors from reputable sources like the EPA and IPCC. While it provides a good estimate of your carbon footprint, actual emissions can vary based on specific circumstances. For the most accurate results, input detailed information about your lifestyle and energy usage.",
  },
  {
    question: "What's considered a good carbon footprint?",
    answer:
      "The global average carbon footprint is about 4 tons per person per year. To meet climate goals, we need to reduce this to under 2 tons by 2050. In developed countries, the average is much higher (15-20 tons in the US). Any reduction you can make helps combat climate change.",
  },
  {
    question: "How can I reduce my carbon emissions?",
    answer:
      "Key ways to reduce emissions include: switching to renewable energy, using public transportation or electric vehicles, eating less meat, reducing air travel, improving home insulation, buying local and seasonal products, and reducing overall consumption. Small changes add up over time.",
  },
  {
    question: "What is the difference between carbon-neutral and net-zero?",
    answer:
      "Carbon-neutral means balancing emissions by offsetting them through projects like tree planting. Net-zero means drastically reducing emissions and only offsetting what cannot be eliminated. Net-zero is considered more impactful as it focuses on actual emission reduction rather than just compensation.",
  },
  {
    question: "Does individual action really make a difference?",
    answer:
      "Yes! While systemic change is crucial, individual actions collectively create significant impact. Your choices influence markets, policies, and social norms. Additionally, reducing your carbon footprint often saves money and improves quality of life through healthier habits.",
  },
  {
    question: "What are carbon offsets and do they work?",
    answer:
      "Carbon offsets are credits that represent the removal or reduction of one ton of CO₂ from the atmosphere. They fund projects like reforestation, renewable energy, or methane capture. Quality offsets can be effective, but it's important to verify projects are legitimate and additional to what would happen anyway.",
  },
  {
    question: "How do I get started with climate action?",
    answer:
      "Start by measuring your current footprint using our calculator. Identify your biggest emission sources, then prioritize changes that are feasible for you. Focus on high-impact areas like energy, transportation, and diet. Join our community forum to learn from others and stay motivated!",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about carbon emissions, climate action, and how to use our calculator
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-muted/50"
              >
                <span className="text-lg font-semibold text-foreground">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-200 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-2 text-muted-foreground leading-relaxed border-t border-border/50">
                  {faq.answer}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Have more questions? Join our community forum to get answers and connect with others
          </p>
          <a
            href="/forum"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Visit Forum
          </a>
        </div>
      </div>
    </section>
  )
}
