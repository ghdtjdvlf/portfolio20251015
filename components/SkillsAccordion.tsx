"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SpotlightCard from "./SpotlightCard";

interface Skill {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

interface SkillsAccordionProps {
  categories: SkillCategory[];
}

export function SkillsAccordion({ categories }: SkillsAccordionProps) {
  return (
    <Accordion type="single" collapsible className="skills-accordion w-full">
      {categories.map((categoryData, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="accordion-item">
          <AccordionTrigger className="accordion-trigger">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{categoryData.icon}</span>
              <span className="text-lg font-semibold">{categoryData.category}</span>
              <span className="text-sm text-muted-foreground ml-2">
                ({categoryData.skills.length})
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="accordion-content">
            <div className="skills-grid">
              {categoryData.skills.map((skill, skillIndex) => (
                <SpotlightCard
                  key={skillIndex}
                  className="custom-spotlight-card flex flex-col items-start justify-center p-5 gap-2"
                  spotlightColor="rgba(0, 229, 255, 0.15)"
                >
                  <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                    {skill.icon}
                    <p className="skill-title font-semibold text-lg">{skill.title}</p>
                  </div>
                  <p className="skill-prd text-sm text-gray-600 dark:text-gray-400 leading-snug">
                    {skill.desc}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
