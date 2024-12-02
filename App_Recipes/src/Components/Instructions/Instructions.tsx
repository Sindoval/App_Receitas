import './Instructions.css';

type InstructionsProp = {
  instructions: string,
};

export default function Instructions({ instructionsData } : { instructionsData: InstructionsProp }) {
  const { instructions } = instructionsData;

  return (
     <section id="instrucao">
        <h2>Instructions</h2>
        <div>
          <p>{instructions}</p>
        </div>
      </section>
  );
}
