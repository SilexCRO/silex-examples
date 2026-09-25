(async () => {
  const baseUrl = process.env.SILEX_PUBLIC_API_BASE_URL || 'https://api.example.silex.invalid';
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(`${baseUrl}/v1/public/projects/example-project`, {
    headers: { accept: 'application/json', 'user-agent': 'silex-public-example/0.1' },
    signal: controller.signal,
  });
  if (!response.ok) throw new Error(`Public API request failed with HTTP ${response.status}`);
  const project = await response.json();
  console.log(JSON.stringify({ id: project.id, name: project.name, network: project.network }, null, 2));
} finally {
  clearTimeout(timeout);
}

})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});


