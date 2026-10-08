import { Reveal } from './Reveal'
import { Section } from './Section'

const groups = [
  {
    title: 'Machine Learning',
    items: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Feature Engineering', 'Model Evaluation'],
  },
  {
    title: 'Deep Learning',
    items: ['TensorFlow', 'Keras', 'PyTorch', 'CNNs', 'EfficientNet', 'U-Net', 'Computer Vision'],
  },
  {
    title: 'NLP / Generative AI',
    items: [
      'NLP',
      'LLMs',
      'RAG',
      'LangChain',
      'LangGraph',
      'Vector Databases',
      'Prompt Engineering',
      'Tool Calling',
      'AI Agents',
    ],
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'REST APIs', 'SQLite', 'Authentication', 'API Integration'],
  },
  {
    title: 'Data / Infrastructure',
    items: ['Apache Kafka', 'Docker', 'Git', 'GitHub', 'Data Pipelines', 'Event-Driven Systems'],
  },
  {
    title: 'Frontend',
    items: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
  },
]

export function Skills() {
  return (
    <Section
      id="skills"
      label="04 / Skills"
      title="Technical Toolkit"
      intro="Modeling, systems, and the infrastructure between them."
      className="border-t border-line"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.05}>
            <div className="h-full rounded-xl border border-line bg-panel p-6 transition hover:border-line-strong">
              <h3 className="font-mono text-[11px] tracking-[0.24em] text-accent uppercase">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-void/60 px-2.5 py-1.5 text-[13px] text-muted-strong transition hover:border-accent/40 hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
