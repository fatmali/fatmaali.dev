export function StateMachineVisualizer() {
  return (
    <div className="not-prose my-8">
      <iframe
        src="https://codesandbox.io/embed/md3rg4?view=preview&module=%2Fsrc%2FStateMachine.ts"
        style={{
          width: "100%",
          height: "500px",
          border: 0,
          borderRadius: "4px",
          overflow: "hidden",
        }}
        title="x-state-blog-demo"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  );
}
