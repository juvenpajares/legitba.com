<script lang="ts">
    export let source: string;           // URL or video ID
    export let type: 'youtube' | 'file'; // Type of video source
    export let start = 0;                // Start time in seconds (YouTube only)
    export let title = '';               // Optional video title
    export let note = '';                // Optional note (e.g., "Claim appears at 1:23")
  </script>
  
  <div class="video-player space-y-2">
    {#if title}
      <h3 class="text-lg font-semibold">{title}</h3>
    {/if}
  
    {#if type === 'youtube'}
      <!-- svelte-ignore a11y_missing_attribute -->
      <iframe
        width="100%"
        height="360"
        src={`https://www.youtube.com/embed/${source}?start=${start}`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="rounded-xl shadow"
      ></iframe>
    {:else if type === 'file'}
      <!-- svelte-ignore a11y_media_has_caption -->
      <video controls class="w-full rounded-xl shadow">
        <source src={source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    {/if}
  
    {#if note}
      <p class="text-sm text-gray-500 italic">{note}</p>
    {/if}
  </div>
  
  <style>
    .video-player {
      max-width: 800px;
      margin: auto;
    }
  </style>
  