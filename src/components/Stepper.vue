<template>
    <!-- Desktop Layout (6 columns) -->
    <div class="hidden xl:grid xl:grid-cols-6 xl:gap-3">
      <div 
        v-for="(step, index) in steps" 
        :key="step.id"
        class="relative bg-white border border-gray-200 rounded-2xl p-3.5 shadow-lg"
      >
        <h4 class="flex items-center gap-2 mb-1.5 text-base font-semibold">
          <span 
            class="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-sm shadow-inner"
            :class="step.badgeClass"
          >
            {{ step.id }}
          </span>
          {{ step.title }}
        </h4>
        <p class="text-slate-600 text-xs leading-relaxed m-0" v-html="step.description"></p>
        
        <!-- Arrow (not on last item) -->
        <div v-if="index < steps.length - 1" class="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <div class="w-3.5 h-0.5 bg-slate-300"></div>
          <div class="absolute right-0 top-1/2 transform translate-x-1.5 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-slate-300 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"></div>
        </div>
      </div>
    </div>
    
    <!-- Large screens (3 columns, 2 rows) -->
    <div class="hidden lg:grid lg:grid-cols-3 lg:gap-4 xl:hidden">
      <div 
        v-for="step in steps" 
        :key="step.id"
        class="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg"
      >
        <h4 class="flex items-center gap-2 mb-2 text-base font-semibold">
          <span 
            class="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-sm shadow-inner"
            :class="step.badgeClass"
          >
            {{ step.id }}
          </span>
          {{ step.title }}
        </h4>
        <p class="text-slate-600 text-sm leading-relaxed m-0" v-html="step.description"></p>
      </div>
    </div>
    
    <!-- Medium screens (2 columns) -->
    <div class="hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden">
      <div 
        v-for="step in steps" 
        :key="step.id"
        class="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg"
      >
        <h4 class="flex items-center gap-2 mb-2 text-base font-semibold">
          <span 
            class="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-sm shadow-inner"
            :class="step.badgeClass"
          >
            {{ step.id }}
          </span>
          {{ step.title }}
        </h4>
        <p class="text-slate-600 text-sm leading-relaxed m-0" v-html="step.description"></p>
      </div>
    </div>
    
    <!-- Mobile (single column) -->
    <div class="grid grid-cols-1 gap-4 md:hidden">
      <div 
        v-for="step in steps" 
        :key="step.id"
        class="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg"
      >
        <h4 class="flex items-center gap-2 mb-2 text-base font-semibold">
          <span 
            class="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-sm shadow-inner"
            :class="step.badgeClass"
          >
            {{ step.id }}
          </span>
          {{ step.title }}
        </h4>
        <p class="text-slate-600 text-sm leading-relaxed m-0" v-html="step.description"></p>
      </div>
    </div>
</template>

<script setup>
const steps = [
  {
    id: 1,
    title: 'Secure Intake',
    description: 'Private portal: brochures, public specs, parts, lubrication, serial/year maps, bulletins, authorized manuals.',
    badgeClass: 'bg-gradient-blue'
  },
  {
    id: 2,
    title: 'Data Mapping',
    description: 'Normalize models ↔ serials ↔ years, capacities, voltages, oils, codes, accessories, upgrade kits.',
    badgeClass: 'bg-gradient-gold'
  },
  {
    id: 3,
    title: 'AI Training',
    description: 'Industrial ML trains on approved content + public refs; QA with real setup &amp; troubleshooting.',
    badgeClass: 'bg-gradient-red'
  },
  {
    id: 4,
    title: 'Widget Launch',
    description: 'Embed the Machinery Genius™ Support button with branding &amp; escalation routes.',
    badgeClass: 'bg-gradient-slate'
  },
  {
    id: 5,
    title: 'Analytics',
    description: 'Dashboards for questions, resolution rates, and feedback; push updates &amp; recalls anytime.',
    badgeClass: 'bg-gradient-blue'
  },
  {
    id: 6,
    title: 'Escalation',
    description: 'Instant answers for routine issues; seamless handoffs to live agents for complex cases.',
    badgeClass: 'bg-gradient-gold'
  }
]
</script>